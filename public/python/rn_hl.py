# Choregraphe simplified export in Python.
from naoqi import ALProxy
names = list()
times = list()
keys = list()
Nao_ip = "192.168.1.12"

# names.append("HeadPitch")
# times.append([0.72, 1.2, 3.16, 4.72, 5.2, 5.56, 7.12, 7.68, 8.08, 10.96, 11.68, 12.2, 14.44])
# keys.append([-0.113446, 0.224996, 0.200713, 0.240855, 0.125664, -0.20886, -0.235619, -0.106465, 0.148448, 0.18675, 0.0767945, 0.264581, 0.289725])

names.append("HeadYaw")
times.append([0.5, 1.5, 4.0])
keys.append([-0.5, -1.0, 0.0])

names.append("RElbowRoll")
times.append([0.5, 1.5])
keys.append([1.5, 1.5])

# names.append("RElbowYaw")
# times.append([0.56, 1.04, 4.56, 5.4, 6.96, 7.92, 10.8, 12.04, 14.28])
# keys.append([1.47829, 1.23483, 1.2217, 1.2217, 1.2217, 0.768491, 0.736278, 0.716335, 0.736278])

names.append("RHand")
times.append([1.5, 4.0])
keys.append([1.0, 0.0])

names.append("RShoulderPitch")
times.append([1.5, 4.0])
keys.append([0.0, 1.5])

names.append("RShoulderRoll")
times.append([1.5, 4.0])
keys.append([-1.0, 0.0])

# names.append("RWristYaw")
# times.append([0.56, 1.04, 4.56, 5.4, 6.96, 7.92, 10.8, 12.04, 14.28])
# keys.append([0.497419, 0.030638, -0.0331613, -0.033162, -0.0331613, 0.145688, 0.171766, 0.176367, 0.171766])

try:
  # uncomment the following line and modify the IP if you use this script outside Choregraphe.
  
  motion = ALProxy("ALMotion", Nao_ip, 9559)

  motion.angleInterpolation(names, keys, times, True)
except BaseException, err:
   print err