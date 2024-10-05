import torch
from torchvision import transforms
from PIL import Image

# Load the model onto CPU
pt_file = torch.jit.load("C:\\Users\\kshit\\OneDrive\\Documents\\University\\Hack_The_Valley_2024\\traced_resnet_model.pt", map_location=torch.device('cpu'))

pt_file.eval()


# Define image transformations (resize, normalize, etc.)
preprocess = transforms.Compose([
    transforms.Resize(256),  # Resize to 256x256
    transforms.CenterCrop(224),  # Center crop to 224x224
    transforms.ToTensor(),  # Convert image to tensor
    transforms.Normalize(  # Normalize with ImageNet mean and std
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Load and preprocess the image
img_path = 'glass_bottle.jpg'
image = Image.open(img_path)
input_tensor = preprocess(image).unsqueeze(0)  # Add batch dimension

# If using a GPU, move the model and input to the GPU
if torch.cuda.is_available():
    model = pt_file.cuda()
    input_tensor = input_tensor.cuda()

# Perform inference without gradient computation
with torch.no_grad():
    output = pt_file(input_tensor)

# Process the output (for a classification task)
probabilities = torch.nn.functional.softmax(output[0], dim=0)
predicted_class = torch.argmax(probabilities).item()

# Print the predicted class
print(f"Predicted class: {predicted_class}")
# Print the head of the file
print("Hello")

