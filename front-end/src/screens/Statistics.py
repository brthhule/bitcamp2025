import google.generativeai as genai
import os
import matplotlib.pyplot as plt

# Configure the Gemini API (using environment variable for security)
genai.configure(api_key=os.environ.get("AIzaSyCAV4afCsLUPyog9P5iNVRB8wtMdcZG5cc"))

model = genai.GenerativeModel('gemini-1.5-pro-latest')

weekly_averages = {}  

def calculate_weekly_statistics(daily_scores):
    weekly_sums = {}
    for day_score in daily_scores:
        for emotion, score in day_score.items():
            weekly_sums[emotion] = weekly_sums.get(emotion, 0) + score

    num_days = len(daily_scores)
    if num_days == 0:
        return {}, (None, 0)

    weekly_averages = {
        emotion: total_score / num_days
        for emotion, total_score in weekly_sums.items()
    }

    dominant_emotion = None
    max_avg_score = -1
    for emotion, avg_score in weekly_averages.items():
        if avg_score > max_avg_score:
            max_avg_score = avg_score
            dominant_emotion = (emotion, avg_score)

    return weekly_averages, dominant_emotion

def generate_weekly_summary_formatted(dominant_emotion):
    """Generates a formatted summary of the week's dominant emotion."""
    if dominant_emotion and dominant_emotion[0]:
        emotion_name = dominant_emotion[0].capitalize()
        emotion_score_percentage = int(dominant_emotion[1] * 100)
        return f"Really {emotion_name}! (With an average {dominant_emotion[0]} score of {emotion_score_percentage}%)."
    else:
        return "No dominant emotion identified for the week."

def generate_emotion_spiel_formatted(weekly_averages):
    """Generates a formatted and slightly more engaging spiel about the week's emotions."""
    if not weekly_averages:
        return "No emotion data available for the week."

    positive_emotions = []
    negative_emotions = []
    neutral_emotions = []

    for emotion, avg_score in weekly_averages.items():
        percentage = int(avg_score * 100)
        if percentage > 60:
            positive_emotions.append(f"{emotion} ({percentage}%)")
        elif percentage < 30:
            negative_emotions.append(f"{emotion} ({percentage}%)")
        elif percentage >= 30 and percentage <= 60:
            neutral_emotions.append(f"{emotion} ({percentage}%)")

    spiel_parts = []
    if positive_emotions:
        spiel_parts.append(f"Looks like you felt quite {' and '.join(positive_emotions)} this week!")
        if "Happy" in [e.split(' ')[0] for e in positive_emotions]:
            spiel_parts.append("Some studies show that smiling can help boost morale and happiness! Looks like you sure were smiling this week :))")
    elif negative_emotions:
        spiel_parts.append(f"It seems you experienced some {' and '.join(negative_emotions)} this week.")
    else:
        spiel_parts.append("The week appeared to be relatively balanced emotionally.")

    return "\n".join(spiel_parts)

def create_weekly_pie_chart(weekly_averages):
    # ... (same as before) ...
    if not weekly_averages:
        print("No weekly average data to create a pie chart.")
        return

    labels = weekly_averages.keys()
    sizes = weekly_averages.values()
    emotion_colors = {
        "happy": "yellow",
        "sad": "blue",
        "angry": "red",
        "fearful": "gray",
        "excited": "orange",
        "bored": "lightgray",
    }
    colors = [emotion_colors.get(label.lower(), "lightcoral") for label in labels]

    plt.figure(figsize=(8, 8))
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
    plt.title("Average Weekly Emotion Distribution")
    plt.axis('equal')
    plt.show()

if __name__ == "__main__":
    daily_data = [
        {'excited': 0.7, 'bored': 0.1, 'happy': 0.8, 'sad': 0.2, 'angry': 0.05, 'fearful': 0.0},
        {'excited': 0.6, 'bored': 0.2, 'happy': 0.75, 'sad': 0.15, 'angry': 0.1, 'fearful': 0.05},
        {'excited': 0.85, 'bored': 0.05, 'happy': 0.9, 'sad': 0.05, 'angry': 0.0, 'fearful': 0.0},
        {'excited': 0.5, 'bored': 0.3, 'happy': 0.6, 'sad': 0.3, 'angry': 0.15, 'fearful': 0.1},
        {'excited': 0.75, 'bored': 0.15, 'happy': 0.8, 'sad': 0.2, 'angry': 0.0, 'fearful': 0.02},
        {'excited': 0.65, 'bored': 0.25, 'happy': 0.7, 'sad': 0.25, 'angry': 0.08, 'fearful': 0.03},
        {'excited': 0.8, 'bored': 0.1, 'happy': 0.88, 'sad': 0.12, 'angry': 0.02, 'fearful': 0.01},
    ]

    weekly_averages, dominant_emotion = calculate_weekly_statistics(daily_data)

    weekly_summary_formatted = generate_weekly_summary_formatted(dominant_emotion)
    print(weekly_summary_formatted)
    print()

    emotion_spiel_formatted = generate_emotion_spiel_formatted(weekly_averages)
    print(emotion_spiel_formatted)
    print()

    print(">> Some other stats about your week:")
    print()
    create_weekly_pie_chart(weekly_averages)
    print()
    print(">> Some shpiel about emotions and blah") 