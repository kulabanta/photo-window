import React, { Component } from 'react'
import Webcam from "react-webcam"
import EXIF from "exif-js"
import axios from "axios"
import jsFileDownload from "js-file-download"
import localIpUrl from "local-ip-url"
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


import MyVerticallyCenteredModal from "./Modal"

import Logo from "./logo.js"


export class Camera2 extends Component {
    constructor(props) {
        super(props)

        this.modalRef=null
    
        this.state = {
             images : [],
             front  : true,
             spimage : false,
             simage : "" ,
             info : false

        }
        this.webcamRef = null
        this.divRef = null

        this.setWebcamRef = (element)=>{
            this.webcamRef = element
        }
        this.setDivRef = (element)=>{
          this.divRef = element
        } 
    }
    spreadImage = (src)=>{
      this.setState(prevState =>{
        return {...prevState,spimage : true,simage : src}
      })
     

    }
    capture = ()=>{
       
        const image = this.webcamRef.getScreenshot();

       

        const today = new Date()
        const date = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()
        const hour = today.getHours()

        const time = (hour>12?hour-12:hour)+":"+today.getMinutes()+":"+today.getSeconds()+" "+(hour>12?"PM":"AM")
        const ipAddress = localIpUrl("public","ipv4");


        

        this.setState(prevState =>{
            return {...prevState,images : [...prevState.images,{img : image,date : date,time : time,IPAddress : ipAddress,type:".jpeg"}]}
        })

    }
    
    downloadImage = (src)=>{
        axios({
          url : src,
          method : "GET",
          responseType : "blob"
        })
        .then(response=>{
          jsFileDownload(response.data,"capture.jpg");
        })
       }
  
        deleteImage = (src) =>{
            this.state.images.splice(this.state.images.indexOf(src),1);
            this.forceUpdate();

            if(this.state.spimage)
            {
              this.setState(prevState =>{
                return {...prevState,spimage : false,simage : ""}
              })
            }
           
       }
      
       changeCamPos = ()=>{
         this.setState(prevState =>{
           return {...prevState,front : !prevState.front}
         })
       }
       
       backToWebCam = ()=>{
        this.setState(prevState =>{
          return {...prevState,spimage : false,simage : ""}
        })
       }

       deleteAndBack = ()=>{
         this.deleteImage(this.state.simage)
         this.setState(prevState =>{
           return {...prevState,spimage : false,simage : ""}
         })
       }
       showInfo = ()=>{
          
          this.setState(prev=>{
            return {...prev,info:true}
          }
            )
          console.log(this.state)

       }
       closeInfo = ()=>{
        this.setState(prev=>{
          return {...prev,info:false}
        }
          )
         
       }  

       
    render() {
        return (
            <div>
              <Logo/>
              {!this.state.spimage?
                <Webcam className="webcam"
                audio={false}
                ref={this.setWebcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={this.state.front ?{facingMode : "user"}:{ facingMode : {exact : "envoirment"} }}
              />
              :
                <div className ="container1">
                  <div className="button_container">

                  <button onClick={this.backToWebCam}  style={{background  : "transparent",border : "none"}} className="overShow">
                      <i className="material-icons " >keyboard_backspace</i>
                  </button>
                  <div className="dropdown1">
                 
                    <span><button className="mybutton" >
                                <i className="material-icons" >more_vert</i>
                          </button>
                    </span>
                    <div className="dropdown-content1">
                      {
                        <div>
                        <button  onClick ={()=>this.downloadImage(this.state.simage.img)} className ="mybutton">
                                download
                          </button>
                          <button onClick ={()=>this.deleteAndBack(this.state.simage.img)} className="mybutton">
                                delete
                          </button>

                          <Button variant="primary" style={{width:"100%"}}onClick={() => this.showInfo(true)}>
                            info
                          </Button>

                          <MyVerticallyCenteredModal
                            image={this.state.simage}
                            show={this.state.info}
                            onHide={() => this.closeInfo(false)}
                          />
                        

                          </div>

                        
                      }

                          
                    </div>
                 
                 </div> 
                   
                </div>



                    <img className="dImage" src={this.state.simage.img}/>
                </div>

                
              }
            
            <div className="flex-container">
              {
                  
                  this.state.images.map(image =>{
                      return(
                        <div className="container2">
                        <img src={image.img} onClick ={()=>this.spreadImage(image)} alt="" className="image"/>
                        <div className="middle">
                    
                           <button onClick={()=>this.downloadImage(image.img)} >
                               <i className=" material-icons " >cloud_download</i>
                           </button>
                            <button onClick={()=>this.deleteImage(image.img)}>
                                <i className=" material-icons ">delete</i>
                            </button>
                        </div>
                    </div>
                      )
    
                  })
                }       
            </div>

           
              <button onClick={this.changeCamPos} className="captureBtns switch " ><i className="large material-icons ">cached</i></button>
            {
              this.state.spimage?
              
              <button disabled style ={{opacity:"0.5"}} onClick={this.capture} className ="captureBtns"><i className="material-icons ">camera_alt</i></button>
              :
              <button  onClick={this.capture} className ="captureBtns click"><i className=" material-icons ">camera_alt</i></button>
            }
            
            </div>
            
        )
    }
}

export default Camera2
