from http.server import BaseHTTPRequestHandler, HTTPServer
import io
import re
import os
from datetime import datetime
from PIL import Image, ImageDraw
import urllib.parse
import google.generativeai as genai

# Configure Gemini
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel('gemini-1.5-pro-latest')

# Sentiment analysis function
def analyze_sentiment(text):
    prompt = f"""Analyze the sentiment of the following text and provide a score (as a percentage between 0% and 100%) for each of the following emotions: excited, bored, happy, sad, angry, and fearful. Return the scores in a clear format. Text: '{text}'"""
    try:
        response = model.generate_content(prompt)
        sentiment_text = response.text.strip()
        print(f"Raw Sentiment Output: {sentiment_text}")

        scores = {}
        emotion_map = {
            "excited": r"excited:\s*(\d+)%", "bored": r"bored:\s*(\d+)%",
            "happy": r"happy:\s*(\d+)%", "sad": r"sad:\s*(\d+)%",
            "angry": r"angry:\s*(\d+)%", "fearful": r"fearful:\s*(\d+)%"
        }

        for emotion, pattern in emotion_map.items():
            match = re.search(pattern, sentiment_text, re.IGNORECASE)
            scores[emotion] = int(match.group(1)) / 100.0 if match else 0.0

        return scores
    except Exception as e:
        return f"Error: {e}"

# Image generation function
def generate_image(score):
    color_mapping = {
        "excited": '#FFB292', "bored": '#CAB19C', "happy": '#FFFFA9',
        "sad": '#C7EBFF", "angry": '#FF7B7B', "fearful": '#DDBFFF'
    }
    width = height = 100
    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)
    filled = 0

    for emotion, value in score.items():
        color = color_mapping.get(emotion)
        num = int(value * 100)
        for _ in range(num):
            if filled >= 100:
                break
            row, col = divmod(filled, 10)
            x0, y0 = col * 10, row * 10
            x1, y1 = x0 + 10, y0 + 10
            draw.rectangle([(x0, y0), (x1, y1)], fill=color)
            filled += 1

    return image

# HTTP handler
class JournalSentimentHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length'))
        body = self.rfile.read(length).decode('utf-8')
        post_data = urllib.parse.parse_qs(body)
        text = post_data.get("text", [""])[0]
        date = post_data.get("date", [datetime.now().strftime("%Y-%m-%d")])[0]

        # Analyze & generate image
        score = analyze_sentiment(text)
        if isinstance(score, str):  # Error occurred
            self.send_response(500)
            self.end_headers()
            self.wfile.write(score.encode())
            return

        image = generate_image(score)

        # Save image to folder
        os.makedirs("journal_images", exist_ok=True)
        file_path = f"journal_images/{date}.png"
        image.save(file_path)

        # Send image as response
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        image_data = buffer.getvalue()

        self.send_response(200)
        self.send_header("Content-type", "image/png")
        self.send_header("Content-Length", str(len(image_data)))
        self.end_headers()
        self.wfile.write(image_data)

# Start server
def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, JournalSentimentHandler)
    print(f"Running at http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
