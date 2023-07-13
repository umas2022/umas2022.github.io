# 打包并上传项目


commit_txt = "fix"


import os
import subprocess
import sys
script_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(script_path)


print("\n===== npm build =====\n")
subprocess.run(["npm", "run", "build"], cwd="./hello_world", shell=True)



print("\n===== push source =====\n")
subprocess.run(["git", "add", "."], cwd=".", shell=True)
subprocess.run(["git", "commit", "-m", commit_txt], cwd=".", shell=True)
subprocess.run(["git", "push"], cwd=".", shell=True)




