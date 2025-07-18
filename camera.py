import cv2
for i in range(3):
    cap = cv2.VideoCapture(i)
    if cap.isOpened():
        print(f"Camera opened successfully at index {i}")
        cap.release()
        break
    cap.release()
else:
    print("Cannot open any camera")