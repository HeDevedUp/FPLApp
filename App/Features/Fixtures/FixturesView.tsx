import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import GlobalStyles from "../../Global/GlobalStyles";
import FixtureCard from './FixtureCard'
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { useGetFixturesQuery, useGetGameweekDataQuery, useGetOverviewQuery, } from '../../Store/fplSlice'
import * as GlobalConstants from '../../Global/GlobalConstants'
import { FplOverview } from "../../Models/FplOverview";
import RNPickerSelect from 'react-native-picker-select';
import LineupContainer from "../GameStats/LineupContainer";
import PlayerSearch from "../PlayerStats/PlayerSearch";
import { FplFixture } from "../../Models/FplFixtures";
import { fixtureChanged, removeFixture } from "../../Store/fixtureSlice";

//TODO: Decide on a good refresh rate for live game data (right now set to 30 seconds)

interface FixturesViewProp {
  overview: FplOverview|undefined;
}

function IsThereAMatchInProgress(gameweekNumber: number, fixtures: FplFixture[]): boolean {
  return fixtures.filter((event) => { return event.id == gameweekNumber })
                 .some((event) => { return event.finished == false && event.started == true });
}

function SortFixtures(fixture1: FplFixture, fixture2: FplFixture) : number {
  if (fixture1.finished_provisional !== true && fixture2.finished_provisional === true) {
    return -1;
  }
  return 0;
}

const FixturesView = (prop: FixturesViewProp) => {

  const dispatch = useAppDispatch();

  const liveGameweek = prop.overview?.events.filter((event) => { return event.is_current == true; })[0].id;
  const [gameweekNumber, setGameweekNumber] = useState(liveGameweek);
  const fixtures = useGetFixturesQuery();

  useEffect(
    function setSelectedFixture() {

      let sortedGameweekFixtures: FplFixture[] | undefined = fixtures.data?.filter((fixture) => { return fixture.event == gameweekNumber})
                                                                           .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2));

      if (sortedGameweekFixtures !== undefined) {

        if (sortedGameweekFixtures[0].started === true) {
          dispatch(fixtureChanged(sortedGameweekFixtures[0]))
        } 
        else {
          dispatch(removeFixture())
        }                              
      }
    }, [gameweekNumber]);

  // TODO: Need to test this while a game is on
  useEffect(
    function refetchLiveGameweekData() {
      let refetchFixture: NodeJS.Timer;
      let refetchGameweek: NodeJS.Timer;

      if (gameweekNumber !== undefined && fixtures.data !== undefined) {
        console.log(IsThereAMatchInProgress(gameweekNumber, fixtures.data))
        if (gameweekNumber === liveGameweek && IsThereAMatchInProgress(gameweekNumber, fixtures.data)) {
          
          let gameweekData = useGetGameweekDataQuery(gameweekNumber);
          refetchFixture = setInterval(() => fixtures.refetch(), 30000);
          refetchGameweek = setInterval(() => gameweekData.refetch(), 30000);
        }
      }
      
      return function stopRefetchingLiveGameweekData() {
        if (refetchFixture !== undefined) {
          clearInterval(refetchFixture);
          clearInterval(refetchGameweek);
        }
      };
    }, [gameweekNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.gameweekView}>

        <RNPickerSelect 
            value = { gameweekNumber }
            onValueChange={(value) => setGameweekNumber(value)} 
            style={pickerSelectStyles}
            items = {
              prop.overview!.events.map((event) => {
              return { label: event.name, value:event.id}
            })
            }/>

      </View>
      { (fixtures.isSuccess == true) &&
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fixturesView}>
        { (fixtures.data !== undefined && gameweekNumber !== undefined) &&

          fixtures.data.filter((fixture) => { return fixture.event == gameweekNumber})
                        .sort((fixture1, fixture2) => SortFixtures(fixture1, fixture2))
                        .map((fixture) => { return <FixtureCard key={fixture.code} fixture={fixture} gameweekNumber={gameweekNumber}/> })     
        }
      </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingRight:5,
    },

    gameweekView: {
      height:30,
      margin: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 5,
    },

    fixturesView: {
      flex: 2,
    },
  });

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: GlobalConstants.width*0.04,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: GlobalConstants.textPrimaryColor,
    borderRadius: GlobalConstants.cornerRadius,
    backgroundColor: GlobalConstants.secondayColor,
  },
  inputAndroid: {
    fontSize: GlobalConstants.width*0.04,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: GlobalConstants.textPrimaryColor,
    borderRadius: GlobalConstants.cornerRadius,
    backgroundColor: GlobalConstants.secondayColor,
  },
});

export default FixturesView;