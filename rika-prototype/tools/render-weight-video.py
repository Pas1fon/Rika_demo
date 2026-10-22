from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import sys,math,subprocess,os,shutil
LANG=os.environ.get("RIKA_VIDEO_LANG","ru")
W,H,FPS,DURATION=1280,720,24,12
out=Path(os.environ.get('RIKA_VIDEO_OUT','outputs'));out.mkdir(exist_ok=True)
PINK='#d70d80';INK='#292330';MUTED='#766c7c';BG='#fbfaf8'
fonts='C:/Windows/Fonts/'
def font(n,b=False):return ImageFont.truetype(fonts+('segoeuib.ttf' if b else 'segoeui.ttf'),n)
TRANSLATIONS={'kk': {'ПАМЯТКА ОТПРАВИТЕЛЮ': 'ЖӨНЕЛТУШІГЕ ЖАДЫНАМА', 'ЭКСПРЕСС-ПОЧТА': 'ЭКСПРЕСС-ПОШТА', 'ИЗМЕРЬТЕ ТРИ СТОРОНЫ': 'ҮШ ҚАБЫРҒАНЫ ӨЛШЕҢІЗ', 'Длина · ширина · высота': 'Ұзындығы · ені · биіктігі', 'Измеряйте внешние размеры упакованной посылки в сантиметрах.': 'Қапталған сәлемдеменің сыртқы өлшемдерін сантиметрмен өлшеңіз.', '40 × 30 × 20 см': '40 × 30 × 20 см', 'СЧИТАЕМ ОБЪЁМНЫЙ ВЕС': 'КӨЛЕМДІК САЛМАҚТЫ ЕСЕПТЕУ', 'Д × Ш × В ÷ 5 000': 'Ұ × Е × Б ÷ 5 000', '= 4,8 кг': '= 4,8 кг', 'Формула РИКА для коробок': 'Қораптарға арналған РИКА формуласы', 'СРАВНИТЕ ДВА ВЕСА': 'ЕКІ САЛМАҚТЫ САЛЫСТЫРЫҢЫЗ', 'На весах: 3,2 кг': 'Нақты салмақ: 3,2 кг', 'Объёмный: 4,8 кг': 'Көлемдік салмақ: 4,8 кг', 'Для расчёта берут больший вес': 'Есептеу үшін үлкен салмақ алынады', 'Округление и условия вашего тарифа уточнит офис.': 'Дөңгелектеу мен тариф шарттарын кеңсе нақтылайды.'}, 'en': {'ПАМЯТКА ОТПРАВИТЕЛЮ': 'SHIPPER’S GUIDE', 'ЭКСПРЕСС-ПОЧТА': 'EXPRESS MAIL', 'ИЗМЕРЬТЕ ТРИ СТОРОНЫ': 'MEASURE ALL THREE SIDES', 'Длина · ширина · высота': 'Length · width · height', 'Измеряйте внешние размеры упакованной посылки в сантиметрах.': 'Measure the outside of your packed parcel in centimetres.', '40 × 30 × 20 см': '40 × 30 × 20 cm', '40 см': '40 cm', '30 см': '30 cm', '20 см': '20 cm', 'СЧИТАЕМ ОБЪЁМНЫЙ ВЕС': 'CALCULATE VOLUMETRIC WEIGHT', 'Д × Ш × В ÷ 5 000': 'L × W × H ÷ 5,000', '40 × 30 × 20 ÷ 5 000': '40 × 30 × 20 ÷ 5,000', '= 4,8 кг': '= 4.8 kg', 'Формула РИКА для коробок': 'RIKA’s formula for boxes', 'СРАВНИТЕ ДВА ВЕСА': 'COMPARE BOTH WEIGHTS', 'На весах: 3,2 кг': 'Actual weight: 3.2 kg', 'Объёмный: 4,8 кг': 'Volumetric: 4.8 kg', 'Для расчёта берут больший вес': 'The higher weight is used', 'Округление и условия вашего тарифа уточнит офис.': 'The office will confirm rounding and tariff conditions.'}}
def tr(value):return TRANSLATIONS.get(LANG,{}).get(value,value)
def text(d,xy,s,n=28,color=INK,b=False):
 s=tr(s)
 if xy[0]>=680:
  while n>12 and d.textlength(s,font=font(n,b))>1216-xy[0]:n-=1
 d.text(xy,s,font=font(n,b),fill=color)
def wrap(d,s,x,y,width,n=28,color=INK,b=False):
 s=tr(s)
 line=''
 for word in s.split():
  test=line+' '+word if line else word
  if d.textlength(test,font=font(n,b))>width:
   text(d,(x,y),line,n,color,b);y+=n*1.5;line=word
  else:line=test
 text(d,(x,y),line,n,color,b)
 return y+n*1.5
def arrow(d,a,b,progress=1,color=PINK):
 end=(a[0]+(b[0]-a[0])*progress,a[1]+(b[1]-a[1])*progress)
 d.line([a,end],fill=color,width=5)
 if progress>.97:
  ang=math.atan2(b[1]-a[1],b[0]-a[0]);
  for pt,rot in [(a,ang),(b,ang+math.pi)]:
   for sign in [-1,1]:d.line([pt,(pt[0]+15*math.cos(rot+sign*.5),pt[1]+15*math.sin(rot+sign*.5))],fill=color,width=4)
def cube(d,dy=0):
 A=(160,300+dy);B=(445,360+dy);C=(560,275+dy);D=(275,215+dy);E=(160,480+dy);F=(445,540+dy);G=(560,455+dy)
 d.ellipse((150,520+dy,610,570+dy),fill='#eee6ed')
 d.polygon([A,B,F,E],fill='#e1b7d1');d.polygon([B,C,G,F],fill='#bc85a7');d.polygon([A,D,C,B],fill='#f1dae9')
 for pts in [[A,B,F,E,A],[A,D,C,G,F],[B,C],[B,F]]:d.line(pts,fill='#9b6888',width=3)
 d.polygon([(303,221+dy),(337,229+dy),(223,314+dy),(190,306+dy)],fill='#fbf1f7')
def frame(t):
 im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
 text(d,(64,34),'РИКА',36,PINK,True);text(d,(195,47),'ЭКСПРЕСС-ПОЧТА',13,MUTED,True)
 text(d,(949,46),'ПАМЯТКА ОТПРАВИТЕЛЮ',13,MUTED,True)
 d.line((64,102,1216,102),fill='#e8dfe7',width=2)
 cube(d)
 if t<4:
  text(d,(680,177),'ИЗМЕРЬТЕ ТРИ СТОРОНЫ',18,PINK,True)
  text(d,(680,225),'Длина · ширина · высота',32,INK,True)
  wrap(d,'Измеряйте внешние размеры упакованной посылки в сантиметрах.',680,300,490,27)
  text(d,(680,450),'40 × 30 × 20 см',38,PINK,True)
  arrow(d,(150,580),(445,642));text(d,(244,603),'40 см',23,PINK,True)
  arrow(d,(480,565),(600,474));text(d,(535,550),'30 см',23,PINK,True)
  arrow(d,(610,275),(610,455));text(d,(580,232),'20 см',21,PINK,True)
 elif t<8:
  text(d,(680,177),'СЧИТАЕМ ОБЪЁМНЫЙ ВЕС',18,PINK,True)
  text(d,(680,229),'Д × Ш × В ÷ 5 000',35,INK,True)
  text(d,(680,320),'40 × 30 × 20 ÷ 5 000',29,MUTED)
  d.rounded_rectangle((680,402,1178,500),radius=16,fill=PINK)
  text(d,(706,418),'= 4,8 кг',48,'white',True)
 else:
  text(d,(680,177),'СРАВНИТЕ ДВА ВЕСА',18,PINK,True)
  text(d,(680,237),'На весах: 3,2 кг',30,INK)
  text(d,(680,297),'Объёмный: 4,8 кг',30,PINK,True)
  wrap(d,'Для расчёта берут больший вес',680,383,480,36,INK,True)
  wrap(d,'Округление и условия вашего тарифа уточнит офис.',680,508,480,20,MUTED)
 d.rounded_rectangle((64,678,1216,683),radius=2,fill='#e9dfe7');d.rounded_rectangle((64,678,64+max(2,1152*t/DURATION),683),radius=2,fill=PINK)
 if 4<=t<8:text(d,(680,550),'Формула РИКА для коробок',19,MUTED)
 return im
for preview in [0,5,10]:frame(preview).save(out/f'preview-{LANG}-{preview}.jpg')
if '--preview' in sys.argv:sys.exit()
cmd=[os.environ.get('RIKA_FFMPEG') or shutil.which('ffmpeg'),'-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-vcodec','libx264','-crf','21','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(out/f'volume-weight-{LANG}.mp4')]
proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=open(out/'video-encode.log','w'))
for i in range(FPS*DURATION):proc.stdin.write(frame(i/FPS).tobytes())
proc.stdin.close();assert proc.wait()==0
for t in [0,5,10]:frame(t).save(out/f'preview-{LANG}-{t}.jpg')
frame(0).save(out/f'volume-weight-{LANG}.jpg')
print('Video ready:',out/f'volume-weight-{LANG}.mp4')
