import csv
import openai

openai.api_key = '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'


def get_openai_response(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",  # GPT-3 engine
        prompt=prompt,
        max_tokens=50  # Adjust as needed
    )
    return response.choices[0].text.strip()


# Function to extract data based on Category or Name
def extract_data(csv_filename, search_key):
    extracted_data = []

    with open(csv_filename, 'r', newline='', encoding='utf-8') as csvfile:
        csv_reader = csv.DictReader(csvfile)

        for row in csv_reader:
            # Split the search_key sentence into words
            words = search_key.split()

            # Check if any word in the sentence matches Category or Name
            if any(word.lower() == row['Category'].lower() or word.lower() == row['Name'].lower() for word in words):
                extracted_data.append(row)

    return extracted_data


# Function to print extracted data in a presentable format
def print_presentable(data):
    for entry in data:
        print("Category:", entry['Category'])
        print("Name:", entry['Name'])
        if entry['Description']:
            print("Description:", entry['Description'])
        if entry['URL']:
            print("URL:", entry['URL'])
        if entry['Photo URL']:
            print("Photo URL:", entry['Photo URL'])
        if entry['Twitter Link']:
            print("Twitter Link:", entry['Twitter Link'])
        if entry['Facebook link']:
            print("Facebook Link:", entry['Facebook link'])
        if entry['Instagram Link']:
            print("Instagram:", entry['Instagram Link'])
        if entry['Rating']:
            print("Rating:", entry['Rating'])
        if entry['Category 2']:
            print("Category 2:", entry['Category 2'])
        if entry['Review 1']:
            print("Review 1:", entry['Review 1'])
        if entry['Review 2']:
            print("Review 2:", entry['Review 2'])
        if entry['Review 3']:
            print("Review 3:", entry['Review 3'])
        if entry['Review 4']:
            print("Review 4:", entry['Review 4'])
        print("------------------------------------------")


while True:
    # Replace 'your_file.csv' with the actual CSV file name
    csv_filename = 'futurepedia_tools.xlsx - Sheet1.csv'
    search_key = input("Enter a sentence to search: ")

    extracted_data = extract_data(csv_filename, search_key)
    if search_key == "0":
        break
    if extracted_data:
        print_presentable(extracted_data)
    else:
        prompt = f"You: {search_key}\nAI:"
        response = get_openai_response(prompt)
        print(response)
