from PIL import Image, ImageDraw
import google.generativeai as genai

genai.configure(api_key="AIzaSyCAV4afCsLUPyog9P5iNVRB8wtMdcZG5cc")


model = genai.GenerativeModel('gemini-1.5-pro-latest')

def analyze_sentiment(text):
    """Analyzes the sentiment of the given text using the Gemini API and returns a dictionary of emotion scores."""
    prompt = f"""Analyze the sentiment of the following text and provide a score (as a percentage between 0% and 100%) for each of the following emotions: excited, bored, happy, sad, angry, and fearful. Return the scores in a clear format. Text: '{text}'"""
    try:
        response = model.generate_content(prompt)
        sentiment_text = response.text.strip()
        print(f"Raw Sentiment Output: {sentiment_text}") 

        scores = {}
        emotion_map = {
            "excited": r"excited:\s*(\d+)%",
            "bored": r"bored:\s*(\d+)%",
            "happy": r"happy:\s*(\d+)%",
            "sad": r"sad:\s*(\d+)%",
            "angry": r"angry:\s*(\d+)%",
            "fearful": r"fearful:\s*(\d+)%",
        }

        for emotion, pattern in emotion_map.items():
            match = re.search(pattern, sentiment_text, re.IGNORECASE)
            if match:
                scores[emotion] = int(match.group(1)) / 100.0
            else:
                scores[emotion] = 0.0  

        return scores
    except Exception as e:
        return f"Error: {e}"

def generate_image(score, filename="colored_squares.png"):
    color_mapping = {
        "excited": '#FFB292',
        "bored": '#CAB19C',
        "happy": '#FFFFA9',
        "sad": '#C7EBFF',
        "angry": '#FF7B7B',
        "fearful": '#DDBFFF'
    }

    width = height = 100
    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)

    filled_squares = 0
    total_squares = 100

    for emotion, value in score.items():
        color = color_mapping.get(emotion)
        if color:
            num_squares = int(value * total_squares)  # Calculate squares for this emotion

            for i in range(num_squares):
                if filled_squares < total_squares:
                    row = filled_squares // 10
                    col = filled_squares % 10

                    x0 = col * 10
                    y0 = row * 10
                    x1 = x0 + 10
                    y1 = y0 + 10

                    draw.rectangle([(x0, y0), (x1, y1)], fill=color)
                    filled_squares += 1

    image.save(filename)
    print(f"Image saved as {filename}")



# generate_image(analyze_sentiment(text))
# the text should be the description of each journal entry 
# each generated output should have an image generated for it 
# the name of the image, should be the date of the image of the jounral entry 
# the images are all stored in a folder 


# this is gonna take an array of scores (7 indecies for 7 days, each score is 
# a score: ({happines, 80%}, {sadness, 20%}, ...) 


# Each image has an underlying score dictionary, I want to store that in like some sort of data structure that I can pull and create statistics out of 
# I can do this in js, but how do I send my scores from the python sentiment analysis.py to js to store it in some datastrucutre?
# Once I constructure averages for the week, I can send back my averages to gemini api prompt to create an output with 3 things: 
#   what emotion the person was mostly, commentary on that emotion, and remedies for a more negative emotion  


# if __name__ == "__main__":
#     text_to_analyze = "I like don't have anything to do today. Like there's nothing that really interests me and I'm just tired really.!"
#     sentiment_scores = analyze_sentiment(text_to_analyze)
#     print(f"\nText: '{text_to_analyze}'")
#     print(f"Sentiment Scores: {sentiment_scores}")





# running my code in the current conda environment:
# python /Users/swey/Documents/Projects/bitcamp2025/front-end/SentimentAnalysis.py
 
# # Example usage:
# score1 = {"excited": 0.2, "happy": 0.8}
# generate_image(score1, "image1.png")

# score2 = {"angry": 0.5, "bored": 0.5}
# generate_image(score2, "image2.png")

# score3 = {"fearful": 1.0}
# generate_image(score3, "image3.png")

# score4 = {"happy": 0.1, "sad": 0.9}
# generate_image(score4, "image4.png")


