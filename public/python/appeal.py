# -*- coding: utf-8 -*-
# 強調

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

names.append("HeadPitch")
times.append([1.5, 2.5])
keys.append([0.2, 0.0])

names.append("HeadYaw")
times.append([0.1])
keys.append([0.0])

names.append("LElbowRoll")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([-1.0, -1.0, -0.1])

names.append("LElbowYaw")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([-1.0, -1.0, -1.0])

names.append("LHand")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([1.0, 1.0, 0.0])

names.append("LShoulderPitch")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([0.7, 0.7, 1.5])

names.append("LShoulderRoll")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([0.5, 0.5, 0.0])

names.append("LWristYaw")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([-1.2, -1.2, 0.0])

names.append("RElbowRoll")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([1.0, 1.0, 0.1])

names.append("RElbowYaw")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([1.0, 1.0, 1.0])

names.append("RHand")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([1.0, 1.0, 0.0])

names.append("RShoulderPitch")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([0.7, 0.7, 1.5])

names.append("RShoulderRoll")
times.append([1.0, 1.0+num, 4.0+num])
keys.append([-0.5, -0.5, 0.0])

names.append("RWristYaw")
times.append([1.5, 1.5+num, 4.0+num])
keys.append([1.2, 1.2, 0.0])

try:
  motion = ALProxy("ALMotion", Nao_ip, 9559)
  tts = ALProxy("ALTextToSpeech", Nao_ip, 9559)
  motion.post.angleInterpolation(names, keys, times, True)
  tts.setVolume(vol)
  tts.say(text)
  print("spoken")

except BaseException, err:
  print err