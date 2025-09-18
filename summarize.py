from transformers import BartTokenizer, BartForConditionalGeneration

# Load model and tokenizer
model_name = "facebook/bart-large-cnn"
tokenizer = BartTokenizer.from_pretrained(model_name)
model = BartForConditionalGeneration.from_pretrained(model_name)

# Your input text
article = """
ChatGPT is a large language model developed by OpenAI, capable of understanding and generating human-like text...
"""

# Tokenize and summarize
inputs = tokenizer([article], max_length=1024, return_tensors='pt', truncation=True)
summary_ids = model.generate(inputs['input_ids'], num_beams=4, max_length=150, early_stopping=True)
summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

print("Summary:", summary)
