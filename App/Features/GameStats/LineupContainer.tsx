// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Modal, Button, Pressable, TextInput, ScrollView } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { changeToDreamTeam, TeamInfo, TeamTypes } from "../../Store/teamSlice";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";
import TeamModal from "./TeamModal";
import { useGetDraftLeagueInfoQuery, useGetDraftUserInfoQuery } from "../../Store/fplSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const TeamSelectorHeader = (teamInfo: TeamInfo) => {

    if (teamInfo.teamType === TeamTypes.Fixture) {
        return (
        <View style={styles.switchContainer}>
            <TeamSwitch/>
        </View>
        )
    }
    else if (teamInfo.teamType === TeamTypes.Dream) {
        return (
            <Text style={styles.text}>Dream Team</Text>
        ) 
    }
    else if (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) {
        return (
            <Text style={styles.text}>{teamInfo.info.name}</Text>
        )
    }
}

const LineupContainer = () => {

    const teamInfo: TeamInfo = useAppSelector((state) => state.team);
    const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
    const dispatch = useAppDispatch();

    const onMyTeamButtonPress = () => {
        setIsTeamModalVisible(!isTeamModalVisible);
    }
    
    const onDreamTeamPress = () => {
        dispatch(changeToDreamTeam())
    }    

    return (
        <View style={styles.container}>

            <TeamModal isVisible={isTeamModalVisible} isVisibleFunction={setIsTeamModalVisible}/>
            
            <View style={styles.top}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.dreamTeamButton} onPress={onDreamTeamPress}>
                        <Image style={styles.icon} source={require('../../../assets/dreamteam.png')} resizeMode="contain"/>
                    </TouchableOpacity>

                    {TeamSelectorHeader(teamInfo)}
                    
                    <TouchableOpacity style={styles.myTeamButton} onPress={onMyTeamButtonPress}>
                        <Image style={styles.icon} source={require('../../../assets/team.png')} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.middle}>
                <Lineup/>
            </View>
            <View style={styles.bottom}></View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        //#region Container styling
        container: {
            flex: 1,
            margin: 0,
        },

        top: {
            flex: 2,
        },

        middle: {
            flex: 14,
            width : '100%',
        },

        bottom: {
            flex: 3,
            backgroundColor: 'lightgray'
        },

        topContainer: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
        },

        switchContainer: {
            alignSelf: 'center',
            width: '40%'
        },

        dreamTeamButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            left: 5,
            backgroundColor: GlobalConstants.buttonColor,
            borderRadius: GlobalConstants.cornerRadius,
            width: GlobalConstants.width*0.1,
            height: '70%',
        },

        icon: {
            width: '80%',
            height: '80%',
            alignSelf: 'center'
        },

        myTeamButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            right: 5,
            backgroundColor: GlobalConstants.buttonColor,
            borderRadius: GlobalConstants.cornerRadius,
            width: GlobalConstants.width*0.1,
            height: '70%'   
        },

        text: {
            alignSelf: 'center',
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.width*0.045,
            fontWeight: 'bold'
        }
        //#endregion
    }
);

export default LineupContainer;