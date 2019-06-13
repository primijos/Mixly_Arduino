'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');


//执行器_点阵屏显示_字符显示
Blockly.Arduino.HT16K33_TEXT = function() {
  Blockly.Arduino.definitions_['include_HT16K33'] = '#include <ZT16K33.h>';
  Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
  Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
  Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
  var string1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ASSIGNMENT);
  var code = 'MixGo_HT16K33.drawStr('+string1+');\n'
  return code;
};

//执行器_点阵屏显示_画点显示
Blockly.Arduino.HT16K33_POS = function() {
  Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
  Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
  Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
  Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var dropdown_type = this.getFieldValue('DrawPixel_TYPE');
  var code = 'MixGo_HT16K33.drawPixel('+pos_x+'-1,'+pos_y+'-1,'+dropdown_type+');\n'
  code+= 'MixGo_HT16K33.writeDisplay();\n';
  return code;
};

//执行器_点阵屏显示_显示图案
Blockly.Arduino.HT16K33_DisplayChar = function() {
 Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
 Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
 Blockly.Arduino.definitions_['var_declare_Matrix1'] = 'uint16_t  MixGo_LedArray[8];';
 Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
 Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
 var dropdown_pin = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ASSIGNMENT);
//  var code='Matrix_'+SDA+'_'+SCL+'.clear();\n';
var code='';
code+='for(int i=0; i<8; i++)\n';
code+='{\n'
code+='  MixGo_LedArray[i]='+dropdown_pin+'[i];\n';
code+='  for(int j=15; j>=0; j--)\n'
code+='  {\n'
code+='    if((MixGo_LedArray[i]&0x01)>0)\n';
code+='      MixGo_HT16K33.drawPixel(j, i,LED_ON);\n';
code+='    MixGo_LedArray[i] = MixGo_LedArray[i]>>1;\n';
code+='  }  \n'
code+='}\n'
code+='MixGo_HT16K33.writeDisplay();\n'
return code;
};


//执行器_点阵屏显示_图案数组
Blockly.Arduino.HT16K33_LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 17; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 17; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
  //  alert(tmp);
  if (tmp.length == 1) 
    tmp = "000" + tmp;
  else if (tmp.length == 2) 
   tmp = "00" + tmp;
 else if (tmp.length == 3) 
   tmp = "0" + tmp;
 code += '0x' + tmp + ((i != 8) ? ',' : '');
}
code += '};';
Blockly.Arduino.definitions_[varName] = "uint16_t " + varName + "[8]=" + code;
  //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块_点阵屏_清除显示
Blockly.Arduino.HT16K33_Displayclear = function() {
 Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
 Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
 Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
 Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
 var code = '';
 code += 'MixGo_HT16K33.clear();\n';
 return code;
};

//辅助块_点阵屏_清除显示
Blockly.Arduino.HT16K33_brightness = function() {
  var BRIGHTNESS = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
  Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
  Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
  Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
  var code = '';
  code += 'MixGo_HT16K33.setBrightness('+BRIGHTNESS+');\n';
  return code;
};

Blockly.Arduino.HT16K33_show_image = function() {
  var dropdown_img_ = this.getFieldValue('img_');
  var code = '"' + dropdown_img_ + '"';
  code = '{';
  
  for (var i = 0; i < 31; i += 4) {
    code += '0x' + dropdown_img_.substr(i, 4) + ((i != 28) ? ',' : '');
  }
  code += '};\n';
  Blockly.Arduino.definitions_['matrix_img_' + dropdown_img_] = "byte " + 'matrix_img_' + dropdown_img_ + "[]=" + code;
  return ['matrix_img_' + dropdown_img_, Blockly.Arduino.ORDER_ATOMIC];
};

//ok
Blockly.Arduino.mixgo_button_is_pressed = function(){
 var btn = this.getFieldValue('btn');
 Blockly.Arduino.setups_['setup_btn'+btn] = 'pinMode('+btn+',INPUT);';
 var code =  'digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_light= function(){
  return ['analogRead(39)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_sound= function(){
  return ['analogRead(35)', Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.mixgo_touch_pin = function(){
  var touch_pin = this.getFieldValue('touch_pin');
  var code = 'touchRead('+touch_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_pin_near = function(){
  var direction = this.getFieldValue('direction');
  var code = 'digitalRead('+ direction +')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.mixGo_led= function() {
  var op = this.getFieldValue('STAT');
  var bright = Blockly.Arduino.valueToCode(this,'bright', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_pinmode'+op] = 'pinMode('+op+',OUTPUT);';
  var code = "digitalWrite("+op+","+bright+");\n";
  return code;
};

Blockly.Blocks.sensor_button_is_pressed=Blockly.Blocks.mixgo_button_is_pressed;
Blockly.Blocks.sensor_button_was_pressed=Blockly.Blocks.sensor_mixgo_button_was_pressed;
Blockly.Blocks.sensor_button_get_presses=Blockly.Blocks.sensor_mixgo_button_get_presses;
Blockly.Blocks.sensor_pin_pressed=Blockly.Blocks.sensor_mixgo_pin_pressed;
Blockly.Blocks.sensor_pin_near=Blockly.Blocks.sensor_mixgo_pin_near;
Blockly.Blocks.sensor_light=Blockly.Blocks.sensor_mixgo_light;
Blockly.Blocks.sensor_sound=Blockly.Blocks.sensor_mixgo_sound;


//传感器_重力感应块_获取9轴数据
Blockly.Arduino.mixgo_MPU9250 = function() {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_FaBo9Axis_MPU9250'] = '#include <FaBo9Axis_MPU9250.h>';
  Blockly.Arduino.definitions_['var_declare_MPU9250'] = 'FaBo9Axis fabo_9axis;\n float ax,ay,az,gx,gy,gz,mx,my,mz;';
  Blockly.Arduino.setups_['setup_mpu9250'] = 'Serial.begin(115200);\nfabo_9axis.begin();';
  var dropdown_type = this.getFieldValue('MixGo_MPU9250_GETAB');
  var code = '';
  if (dropdown_type == "a") code += 'fabo_9axis.readAccelX()';
  if (dropdown_type == "b") code += 'fabo_9axis.readAccelY()';
  if (dropdown_type == "c") code += 'fabo_9axis.readAccelZ()';
  if (dropdown_type == "d") code += 'fabo_9axis.readGyroX()';
  if (dropdown_type == "e") code += 'fabo_9axis.readGyroY()';
  if (dropdown_type == "f") code += 'fabo_9axis.readGyroZ()';
  if (dropdown_type == "g") code += 'fabo_9axis.readMagnetX()';
  if (dropdown_type == "h") code += 'fabo_9axis.readMagnetY()';
  if (dropdown_type == "i") code += 'fabo_9axis.readMagnetZ()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
