# -*- coding: utf-8 -*-
# 置く指さし

from naoqi import ALProxy
import sys
import time

names = list()
times = list()
keys = list()
Nao_ip = "192.168.1.12"
data = sys.stdin.readline()

data = data.split("*")
text = data[0]
vol = float(data[1])

num = len(text)/20
if(num>3):
    num = 3

names.append("RElbowRoll")
times.append([0.5, 1.5, 1.5+num, 4.0+num])
keys.append([0.1, 0.1, 0.1, 0.4])

names.append("RElbowYaw")
times.append([1.5, 1.5+num])
keys.append([2.0, 2.0])

names.append("RHand")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([1.0, 1.0, 0.0])

names.append("RShoulderPitch")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([0.9, 0.9, 1.5])

names.append("RShoulderRoll")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([-1.0, -1.0, 0.0])

try:
  motion = ALProxy("ALMotion", Nao_ip, 9559)
  tts = ALProxy("ALTextToSpeech", Nao_ip, 9559)
  motion.post.angleInterpolation(names, keys, times, True)
  tts.setVolume(vol)
  if(vol>0.7):
    tts.setParameter("pitch",0.8)
    tts.setParameter("speed",0.8)
  else:
    tts.setParameter("pitch",1.0)
    tts.setParameter("speed",1.0)
  tts.say(text)
  tts.say(text)
  print("spoken")

except BaseException, err:
  print err