import { StyleSheet } from "react-native";
import { primaryColor, textPrimaryColor, width, smallFont, cornerRadius, height, secondaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    //#region Container styling
    container: {
        flex: 1,
        margin: 0,
    },

    top: {
        height: 50,
        backgroundColor: primaryColor,
        zIndex: 1,
    },

    middle: {
        flex: 9,
        width : '100%',
    },

    controlsContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1,
        backgroundColor: primaryColor,
    },

    leftButtonsContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingLeft: 5, 
        flexDirection: 'row' 
    },

    rightButtonsContainers: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingRight: 5
    },

    lineupHeaderContainer: {
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 6
    },

    teamSwitchContainer: {
        alignSelf: 'center', 
        height: '90%', 
        width: '65%'
    },

    buttonContainer: {
        height: '70%',
        aspectRatio: 1,
        margin: 3
    },

    playerSearchButtonContainer: {
        height: '60%',
        aspectRatio: 1,
        margin: 3,
        marginTop: 4,
    },

    switchContainer: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    },

    icon: {
        width: '80%',
        height: '80%',
        alignSelf: 'center'
    },

    text: {
        alignSelf: 'center',
        color: textPrimaryColor,
        fontSize: width*0.045,
        fontWeight: 'bold'
    },

    leagueContainer: {
        height: height * 0.55, 
        width: width * 0.8,
        borderRadius: cornerRadius,
        padding: 5,
        backgroundColor: secondaryColor
    }
    //#endregion
});