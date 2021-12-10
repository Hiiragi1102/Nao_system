from naoqi import ALProxy
import sys
import time

# names = list()
# times = list()
# keys = list()

text = sys.stdin.readline()
print(text)

try:
  # uncomment the following line and modify the IP if you use this script outside Choregraphe.
  
  # motion = ALProxy("ALMotion", "192.168.1.19", 9559)
  # motion.post.angleInterpolation(names, keys, times, True)
  
  tts = ALProxy("ALTextToSpeech", "192.168.1.19", 9559)
  # time.sleep(0.6)
  tts.say(text)

except BaseException, err:
   print err