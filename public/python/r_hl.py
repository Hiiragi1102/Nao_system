# Choregraphe simplified export in Python.
from naoqi import ALProxy
names = list()
times = list()
keys = list()

# names.append("HeadPitch")
# times.append([0.72, 1.2, 3.16, 4.72, 5.2, 5.56, 7.12, 7.68, 8.08, 10.96, 11.68, 12.2, 14.44])
# keys.append([-0.113446, 0.224996, 0.200713, 0.240855, 0.125664, -0.20886, -0.235619, -0.106465, 0.148448, 0.18675, 0.0767945, 0.264581, 0.289725])

names.append("HeadYaw")
times.append([0.5, 1.5, 4.0])
keys.append([-0.5, -1.0, 0.0])

# names.append("LElbowRoll")
# times.append([0.5, 1.5])
# keys.append([-1.0, -0.5])

# names.append("LElbowYaw")
# times.append([0.64, 1.12, 4.64, 5.48, 7.04, 7.6, 8, 10.88, 11.6, 12.12, 14.36])
# keys.append([-1.40324, -0.955723, -0.909316, -1.54856, -1.55509, -0.720821, -0.474047, -0.474047, -0.303687, -0.713353, -0.736278])

# names.append("LHand")
# times.append([1.5, 4.0])
# keys.append([1.0, 0.0])

# names.append("LShoulderPitch")
# times.append([1.5, 4.0])
# keys.append([-0.5, 1.5])

# names.append("LShoulderRoll")
# times.append([1.5, 4.0])
# keys.append([1.0, 0.0])

# names.append("LWristYaw")
# times.append([0.64, 1.12, 4.64, 5.48, 7.04, 8, 10.88, 12.12, 14.36])
# keys.append([-0.895354, -0.833004, -0.862194, 0.0192082, 0.0331606, -0.60904, -0.65506, -0.182588, -0.171766])

names.append("RElbowRoll")
times.append([0.5, 1.5])
keys.append([1.5, 0.5])

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
  
  motion = ALProxy("ALMotion", "192.168.1.9", 9559)

  motion.angleInterpolation(names, keys, times, True)
except BaseException, err:
   print err