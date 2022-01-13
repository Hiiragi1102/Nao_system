# -*- coding: utf-8 -*-
# 上段指さし+顔向け

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
vol = data[1]

num = len(text)/20
if(num>3):
    num = 3

names.append("HeadYaw")
times.append([0.5, 1.5, 4.0+num])
keys.append([-0.5, -1.0,  0.0])

names.append("RElbowRoll")
times.append([0.5, 1.5])
keys.append([1.0, 0.5])

names.append("RHand")
times.append([1.5, 4.0+num])
keys.append([1.0, 0.0])

names.append("RShoulderPitch")
times.append([1.5, 4.0+num])
keys.append([-0.5, 1.5])

names.append("RShoulderRoll")
times.append([1.5, 4.0+num])
keys.append([-1.0, 0.0])

try:
  motion = ALProxy("ALMotion", Nao_ip, 9559)
  tts = ALProxy("ALTextToSpeech", Nao_ip, 9559)
  motion.post.angleInterpolation(names, keys, times, True)
  tts.setVolume(vol)
  tts.say(text)
  print("spoken")

except BaseException, err:
  print err