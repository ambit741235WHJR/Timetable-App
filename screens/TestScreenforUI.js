import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';

const Home = ({navigation}) => {
    let name, image;
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on('value', function (snapshot) {
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
    });

    return(
        <View style={{
            backgroundColor:"#FFF",
            flex:1
        }}>
           <View style={{
               backgroundColor:"#00a46c",
               height:"28%",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>
               <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                            source={require('../assets/1.png')}
                            style={{
                                height:10,
                                width:20,
                                marginTop:50
                            }}
                    />
               </TouchableOpacity>
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:25,
                   width:"100%"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize:20,
                            color:"#FFF",
                            fontWeight:"bold"
                        }}>Hi {name}</Text>
                   </View>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                        <Image
                            source={{ uri: image }}
                            style={{height:60, width:60, borderRadius: 50}}
                        />
                   </View>
               </View>
           </View>
           <LinearGradient
            colors={["rgba(0,164,109,0.4)", "transparent"]}
            style={{
                left:0,
                right:0,
                height:90,
                marginTop:-45
            }}
           >
               <View style={{
                   backgroundColor:"#FFF",
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderRadius:15,
                   marginTop:25,
                   flexDirection:"row",
                   alignItems:"center"
               }}>
                   <TextInput
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight:"bold",
                            fontSize:18,
                            width:260
                        }}
                   />
                   <Image
                    source={require('../assets/3.png')}
                    style={{height:20,width:20}}
                   />
               </View>
            </LinearGradient>

                <ScrollView>

                    <View style={{
                        flexDirection:"row",
                        paddingHorizontal:20,
                        width:"100%",
                        alignItems:"center"
                    }}>
                        <View style={{width:"50%"}}>
                                <Text style={{
                                    fontWeight:"bold",
                                    fontSize:17,
                                    color:"#585a61"
                                }}>Created Timetables</Text>
                                <View style={{
                                    height:4,
                                    backgroundColor:"#b1e5d3",
                                    width:115,
                                    marginTop:-5
                                }}>

                                </View>

                        </View>
                    </View>

                    
                
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{height:400}}
                        >
                            <LinearGradient
                                colors={["rgba(0,164,109,0.09)", "transparent"]}
                                style={{
                                    position:"absolute",
                                    left:0,
                                    right:0,
                                    height:100,
                                    marginTop:220,
                                    top:0
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    height:250,
                                    elevation:2,
                                    backgroundColor:"#FFF",
                                    marginLeft:20,
                                    marginTop:20,
                                    borderRadius:15,
                                    marginBottom:10,
                                    width:160
                                }}
                            >
                                <Image
                                    source={require('../assets/4.png')}
                                />
                                <View style={{
                                    flexDirection:"row",
                                    paddingTop:10,
                                    paddingHorizontal:10
                                }}>
                                    <Text style={{
                                        fontWeight:"bold"
                                    }}>SAMANTHA</Text>
                                    <Text style={{
                                        fontWeight:"bold",
                                        color:"#00a46c",
                                        paddingLeft:35
                                    }}>$400</Text>
                                </View>
                                <Text style={{
                                    paddingHorizontal:10,
                                    fontWeight:"bold",
                                    color:"#b1e5d3",
                                    paddingTop:3
                                }}>
                                    RUSSIA
                                </Text>
                            </TouchableOpacity>

                            <View 
                                // onPress={()=>navigation.navigate("Detail")}
                                style={{
                                    height:250,
                                    elevation:2,
                                    backgroundColor:"#FFF",
                                    marginLeft:20,
                                    marginTop:20,
                                    borderRadius:15,
                                    marginBottom:10,
                                    width:160
                                }}
                            >
                                <Image
                                    source={require('../assets/5.png')}
                                />
                                <View style={{
                                    flexDirection:"row",
                                    paddingTop:10,
                                    paddingHorizontal:10
                                }}>
                                    <Text style={{
                                        fontWeight:"bold"
                                    }}>ANGELICA</Text>
                                    <Text style={{
                                        fontWeight:"bold",
                                        color:"#00a46c",
                                        paddingLeft:45
                                    }}>$400</Text>
                                </View>
                                <Text style={{
                                    paddingHorizontal:10,
                                    fontWeight:"bold",
                                    color:"#b1e5d3",
                                    paddingTop:3
                                }}>
                                    RUSSIA
                                </Text>
                            </View>

                            <View 
                                // onPress={()=>navigation.navigate("Detail")}
                                style={{
                                    height:250,
                                    elevation:2,
                                    backgroundColor:"#FFF",
                                    marginLeft:20,
                                    marginTop:20,
                                    borderRadius:15,
                                    marginBottom:10,
                                    width:160
                                }}
                            >
                                <Image
                                    source={require('../assets/6.png')}
                                />
                                <View style={{
                                    flexDirection:"row",
                                    paddingTop:10,
                                    paddingHorizontal:10
                                }}>
                                    <Text style={{
                                        fontWeight:"bold"
                                    }}>SAMANTHA</Text>
                                    <Text style={{
                                        fontWeight:"bold",
                                        color:"#00a46c",
                                        paddingLeft:35
                                    }}>$400</Text>
                                </View>
                                <Text style={{
                                    paddingHorizontal:10,
                                    fontWeight:"bold",
                                    color:"#b1e5d3",
                                    paddingTop:3
                                }}>
                                    RUSSIA
                                </Text>
                            </View>

                        </ScrollView>
                </ScrollView>
        </View>
    )
}
export default Home;