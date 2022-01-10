# -*- coding: utf-8 -*-
# 上段指さし+視線

from naoqi import ALProxy
import sys
import time

names = list()
times = list()
keys = list()
Nao_ip = "192.168.1.12"
data = sys.stdin.readline()

print(data)

names.append("HeadYaw")
times.append([0.5, 1.5, 4.0])
keys.append([-0.5, -1.0, 0.0])

names.append("RElbowRoll")
times.append([0.5, 1.5])
keys.append([1.0, 0.5])

names.append("RHand")
times.append([1.5, 4.0])
keys.append([1.0, 0.0])

names.append("RShoulderPitch")
times.append([1.5, 4.0])
keys.append([-0.5, 1.5])

names.append("RShoulderRoll")
times.append([1.0, 4.0])
keys.append([-1.0, 0.0])

try:
  motion = ALProxy("ALMotion", Nao_ip, 9559)
  tts = ALProxy("ALTextToSpeech", Nao_ip, 9559)
  motion.post.angleInterpolation(names, keys, times, True)
  tts.say(data)
  print("spoken")

except BaseException, err:
   print err