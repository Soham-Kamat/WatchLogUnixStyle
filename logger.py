import random,time

def main():
    randomText=['sadsfgfdsa fdgjadff','dsfdgds fdskjnfdf','fdghfjdsakb ddsnfdf']

    while True:
        with open('logfile','a') as logfile:
            s="[ "+time.asctime(time.localtime())+" ] "
            s+=randomText[random.randint(0,2)]
            s+='\n'
            logfile.write(s)
            time.sleep(1)

main()
