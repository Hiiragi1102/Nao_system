# -*- coding: utf-8 -*-
from naoqi import ALProxy
import sys
import time

Nao_ip = "192.168.1.12"
data = sys.stdin.readline()
data = data.split("*")
text = data[0]
vol = float(data[1])



try:
  tts = ALProxy("ALTextToSpeech", Nao_ip, 9559)
  tts.setVolume(vol)
  if(vol>0.7):
    tts.setParameter("pitch",0.8)
    tts.setParameter("speed",0.8)
  else:
    tts.setParameter("pitch",1.0)
    tts.setParameter("speed",1.0)
    
  tts.say(text)
  print("spoken")

except BaseException, err:
  print err