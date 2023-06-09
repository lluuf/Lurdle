# import json module
import json
import os

# Open the input file and read the words
with open(os.path.join(os.sys.path[0], "words.txt"), "r") as f:
    words = f.read().split()

# Sort the words by length
words.sort(key=len)

# Create a dictionary to store the words by length
words_by_length = {}

# Loop through the words and add them to the dictionary
for word in words:
    # Get the length of the word
    length = len(word)
    # If the length is not in the dictionary, create a new list for it
    if length not in words_by_length:
        words_by_length[length] = []
    # Append the word to the list of its length
    words_by_length[length].append(word)

# Loop through the dictionary and write each list to a new file
for length, words in words_by_length.items():
    # Create a file name based on the length
    file_name = f"words_{length}.txt"
    # Open the file and write the words as an array using json.dump()
    with open(file_name, "w") as f:
        json.dump(words, f)
