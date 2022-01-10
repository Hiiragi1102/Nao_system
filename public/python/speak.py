# -*- coding: utf-8 -*-
from naoqi import ALProxy
import sys
import time

Nao_ip = "192.168.1.12"
data = sys.stdin.readline()
print(data)

try:
  tts = ALProxy("ALTextToSpeech", Nao_ip, 9559)
  tts.say(data)
  print("spoken")

except BaseException, err:
  print err