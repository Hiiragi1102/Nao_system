# -*- coding: utf-8 -*-
# 下段指さし 調整前

from naoqi import ALProxy
import sys
import time

names = list()
times = list()
keys = list()
Nao_ip = "192.168.1.12"
# data = sys.stdin.readline()

# print(data)

names.append("RElbowRoll")
times.append([0.5, 1.5])
keys.append([1.0, 0.1])

names.append("RElbowYaw")
times.append([0.5, 1.5, 4.0])
keys.append([1.5, 2.0, 2.0])

names.append("RHand")
times.append([1.5, 4.0])
keys.append([1.0, 0.0])

names.append("RShoulderPitch")
times.append([1.5, 4.0])
keys.append([1.2, 1.5])

names.append("RShoulderRoll")
times.append([1.0, 4.0])
keys.append([-1.0, 0.0])

try:
  motion = ALProxy("ALMotion", Nao_ip, 9559)
  # tts = ALProxy("ALTextToSpeech", Nao_ip, 9559)
  motion.angleInterpolation(names, keys, times, True)
  # tts.say(data)
  # print("spoken")

except BaseException, err:
   print err