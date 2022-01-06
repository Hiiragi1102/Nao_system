# -*- coding: utf-8 -*-
from naoqi import ALProxy
import sys
import time


# names = list()
# times = list()
# keys = list()
data = sys.stdin.readline()

print(data)

try:
  # motion = ALProxy("ALMotion", "192.168.1.19", 9559)
  # motion.post.angleInterpolation(names, keys, times, True)
  tts = ALProxy("ALTextToSpeech", "192.168.1.12", 9559)
  # time.sleep(0.6)
  tts.say(data)
  print("spoken")

except BaseException, err:
  print err