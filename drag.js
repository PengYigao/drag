window.onload=function(){
    	var btn=document.getElementsByTagName('input');

    	btn[0].onclick=function(){

    		var come1=new comeOn();
    		come1.inIt({
    			iNow:1,
    			width:500,
    			height:200,
    			title:"广告",
    			dir:"center",
    			mark:false,
    			move:true

    		});
    	}
    }

    function comeOn(){

    	this.oDiv=null;
    	this.oMark=null;
    	this.X=0;
    	this.Y=0;

    	this.disX=0;
    	this.disY=0;
    	this.setting={
    		width:500,
    		height:500,
    		title:"",
    		dir:"center",
    		mark:false,
    		move:false
    	}
    }
    
    comeOn.prototype.json={};


    

    comeOn.prototype.inIt=function(opt){
    	extend(opt,this.setting);

    	if(this.json[opt.iNow]==undefined){
    		this.json[opt.iNow]=true;
    	}
    	if(this.json[opt.iNow]){
	    	this.oDiv=document.createElement("div");
	    	this.oDiv.className="div1";
	    	this.oDiv.innerHTML='<div class="div2"><span class="title">公告</span><span class="goBig">口</span><span class="goSmall">-</span><span class="close">×</span></div>';
	    	document.body.appendChild(this.oDiv);
	    	this.data();
	    	this.close();
	    	this.createMark();
	    	this.startMove()
	    	this.goBig();
	    	this.goSmall();
	    	this.json[opt.iNow]=false;
    	}

    }

    comeOn.prototype.data=function(){
    	this.oDiv.style.width=this.setting.width+"px";
    	this.oDiv.style.height=this.setting.height+"px";
    	var oDiv2=this.oDiv.getElementsByTagName('div')[0];
    	oDiv2.style.width=this.setting.width;
        if(this.setting.dir=="center"){
	    	this.oDiv.style.left=(viewWidth()-this.oDiv.offsetWidth)/2+"px";
	    	this.oDiv.style.top=(viewHeight()-this.oDiv.offsetHeight)/2+"px";
        }else if(this.setting.dir=="down"){
        	this.oDiv.style.left=(viewWidth()-this.oDiv.offsetWidth)+"px";
	    	this.oDiv.style.top=(viewHeight()-this.oDiv.offsetHeight)+"px";
        } 	
    }
    
    comeOn.prototype.close=function(){

    	var aSpan=this.oDiv.getElementsByTagName('span')[3];
    	var This=this;
    	aSpan.onclick=function(){
    		document.body.removeChild(This.oDiv);

    		if(This.setting.mark){
    			document.body.removeChild(This.oMark);
    		}
    		This.json[This.setting.iNow]=true;
    	}
    }
    
    comeOn.prototype.createMark=function(){
    	
    	if(this.setting.mark){
    		this.oMark=document.createElement("div");
    		this.oMark.className="mark";
    		this.oMark.style.width=viewWidth()+"px";
    		this.oMark.style.height=viewHeight()+"px";
    		document.body.appendChild(this.oMark);
    	}
    }

    comeOn.prototype.startMove=function(){
    	var This=this;
    	this.oDiv.onmousedown=function(ev){
    		
    		This.fnDown(ev);
            This.X=ev.clientX;
            This.Y=ev.clientY;
    		return false;
    	}
    }

    comeOn.prototype.fnDown=function(ev){
    	var This=this;
    	this.disX=ev.clientX-this.oDiv.offsetLeft;
    	this.disY=ev.clientY-this.oDiv.offsetTop;
    	var disX1=this.oDiv.offsetWidth+this.oDiv.offsetLeft-ev.clientX;
        var disY1=this.oDiv.offsetTop+this.oDiv.offsetHeight-ev.clientY;
        
    	if(this.disX<10||disX1<10){
    		document.onmousemove=function(ev){
                var speedX=ev.clientX-This.X;
                
    			if(This.disX<10){
                    
    				This.oDiv.style.width=This.oDiv.offsetWidth-(speedX)-2+"px";
    				This.oDiv.style.left=This.oDiv.offsetLeft+(speedX)+"px";
                    
    			}else if(disX1<10){
    				This.oDiv.style.width=This.oDiv.offsetWidth+(speedX)+2+"px";   
    			}
    	        This.X=ev.clientX;
    		}


    		document.onmouseup=function(){

    			document.onmouseup=document.onmousemove=null;
    		}
    	}else if(this.disY<10||disY1<10){

            document.onmousemove=function(ev){
                var speedY=ev.clientY-This.Y;
                
                if(This.disY<10){
                    This.oDiv.style.height=This.oDiv.offsetHeight-speedY-2+"px";
                    This.oDiv.style.top=This.oDiv.offsetTop+speedY+"px";
                }else if(disY1<10){
                    This.oDiv.style.height=This.oDiv.offsetHeight+speedY-2+"px";
                }

                This.Y=ev.clientY;
            }
            document.onmouseup=function(){
                document.onmouseup=document.onmousemove=null;
            }
    	}else{

	    	document.onmousemove=function(ev){
	    		This.fnMove(ev);
	    	}
	    	document.onmouseup=function(){
	    		document.onmouseup=document.onmousemove=null;
	    	}
    	}
    }
    
    comeOn.prototype.goBig=function(){
    	var aSpan1=this.oDiv.getElementsByTagName('span')[1];
    	var This=this;
    	aSpan1.onclick=function(){
    		This.oDiv.style.width=viewWidth()+"px";
    	    This.oDiv.style.height=viewHeight()+"px";
    	    This.oDiv.style.left=0+"px";
    	    This.oDiv.style.top=0+"px";
    	}
    }

    comeOn.prototype.goSmall=function(){
    	var aSpan2=this.oDiv.getElementsByTagName('span')[2];
        var This=this;
        aSpan2.onclick=function(){
        	This.oDiv.style.width=This.setting.width+"px";
    	    This.oDiv.style.height=This.setting.height+"px";
    	    if(This.setting.dir=="center"){
		    	This.oDiv.style.left=(viewWidth()-This.oDiv.offsetWidth)/2+"px";
		    	This.oDiv.style.top=(viewHeight()-This.oDiv.offsetHeight)/2+"px";
	        }else if(This.setting.dir=="down"){
	        	This.oDiv.style.left=(viewWidth()-This.oDiv.offsetWidth)+"px";
		    	This.oDiv.style.top=(viewHeight()-This.oDiv.offsetHeight)+"px";
	        } 
        }
    }

    comeOn.prototype.fnMove=function(ev){
    	this.oDiv.style.left=ev.clientX-this.disX+"px";
    	this.oDiv.style.top=ev.clientY-this.disY+"px";
    }

    function viewWidth(){
    	return document.documentElement.clientWidth;
    }
    function viewHeight(){
    	return document.documentElement.clientHeight;
    }
	function extend(obj1,obj2){
		for(var attr in obj1){
			obj2[attr]=obj1[attr];
		}
	}