import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { OverviewStats } from "../../Global/EnumsAndDicts";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Jerseys } from "../../Global/Images";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";

interface PlayerListItemProps {
    player: PlayerOverview;
    overview: FplOverview;
    fixtures: FplFixture[];
    statFilter: string;
}

const PlayerListItem = (props: PlayerListItemProps) => {

    return (
        <View key={props.player.id} style={styles.tableView}>
            <View style={{flex: 1, flexDirection: 'row', height: GlobalConstants.height* 0.05}}>
                <View style={{ flex: 1 }}>
                    <Image style={styles.jersey} source={Jerseys[props.player.team_code]} resizeMode="contain"/>
                </View>
                
                <View style={{flex: 3}}> 
                    <Text style={styles.tableText}>{props.player.web_name}</Text>
                    <View style={{flexDirection: 'row', marginTop: 2}}>
                        <Text style={[styles.tableText, {fontWeight: 'bold'}]}>{props.overview.teams.find(team => team.code === props.player.team_code)?.short_name}  </Text>
                        <Text style={styles.tableText}>{props.overview.element_types.find(element => element.id === props.player.element_type)?.singular_name_short}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.tableNumberView}>
                <Text style={styles.tableText}>
                    {  (props.statFilter !== 'Cost') ? 
                        
                        props.player[Object.keys(OverviewStats).find(key => OverviewStats[key] === props.statFilter) as keyof PlayerOverview] :

                        (props.player[Object.keys(OverviewStats).find(key => OverviewStats[key] === props.statFilter) as keyof PlayerOverview] as number / 10).toFixed(1)
                    }
                </Text>
            </View>
        </View>
    )

}

export default PlayerListItem;

const styles = StyleSheet.create({

    tableView: {
        flex: 1,
        backgroundColor: GlobalConstants.secondaryColor,
        margin: 5,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },

    tableNumberView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
    },

    jersey: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'red',
    },

});