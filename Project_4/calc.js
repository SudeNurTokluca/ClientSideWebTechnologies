  light();
  function click_ic(){
      if(document.getElementById("icon").className==='fa-sharp fa-solid fa-sun'){ dark();}
      else {light();}
  }
  function light(){
    document.getElementById("icon").className="fa-sharp fa-solid fa-sun"
    let themeCssEl = document.querySelector('#theme-css') 
    themeCssEl.setAttribute('href', 'light.css') 
  }
  function dark(){
    document.getElementById("icon").className="fa-sharp fa-solid fa-moon"
    let themeCssEl = document.querySelector('#theme-css') 
    themeCssEl.setAttribute('href', 'dark.css') 
  }
  var last
  var last_ex
  var flag
  var flag_dig
  var flag_op=false
  clear_smt()
  function write_smt(smt){
      if(parseInt(smt)>47 || parseInt(smt)<57){
          if(flag===true){
              clear_smt()
          }
          document.getElementById("current").innerHTML+=smt
          if(flag_dig===false){  document.getElementById("result").innerHTML=smt}
          else{  document.getElementById("result").innerHTML+=smt}
          flag_op=false
          flag_dig=true
      }
      else if(smt=='='){
              calc_smt()
              last_ex=document.getElementById("current").innerHTML
              document.getElementById("current").innerHTML+=' '+smt
              flag=true                  
      }
      else{
          flag=false
          if(flag_op===true){
              document.getElementById("current").innerHTML=last  
              calc_smt()
          }
          else{
              if(last_ex!=''){
                  document.getElementById("current").innerHTML=last_ex
                  last_ex=''
              }
              calc_smt()
              document.getElementById("current").innerHTML=last
          }
          document.getElementById("current").innerHTML+=' '+smt+' '    
          flag_dig=false
          flag_op=true 
      }
  }
  function clear_smt(){
      document.getElementById("current").innerHTML=' '
      document.getElementById("result").innerHTML='0'
      last=0
      last_ex=''
      flag=false
      flag_dig=false
  }
  function calc_smt(){
      if(document.getElementById("current").innerHTML==' '){document.getElementById("current").innerHTML=0}
      var result=eval(document.getElementById("current").innerText)
      document.getElementById("result").innerHTML= result
      if(document.getElementById("result").innerHTML.includes('.')==true) {
          result=result.toFixed(2)
          document.getElementById("result").innerHTML=result
      }
      last=result
  }