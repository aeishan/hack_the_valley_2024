from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.python.keras.applications import Xception

# Define your model architecture (2D CNN example)

model = Xception(weights='imagenet', input_shape=(64, 64, 3), include_top=True)


# Print the model summary to verify
model.summary()

# Load the weights from the .h5 file
model.load_weights('model.h5')

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

#
#NOTHING IS WORKING BRO I SPEND THE LAST 8 HOURS AND GOT ALMOST NO WHERE, test.py has something working but still not fully and this shit has nothing working.
#