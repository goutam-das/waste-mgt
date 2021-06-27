import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox-typescript';
import { xorBy } from 'lodash';

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
    {
        item: 'Plastic',
        id: 'plastic'
    },
    {
        item: 'Metal',
        id: 'metal'
    },
    {
        item: 'E-waste',
        id: 'ewaste'
    },
    {
        item: 'Wood',
        id: 'wood'
    },
    {
        item: 'Glass',
        id: 'glass'
    }
];

function App() {
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedTeams, setSelectedTeams] = useState([]);
    return (
        <View>
            <SelectBox
                label="Select one or more materials"
                options={K_OPTIONS}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                containerStyle={{
                    borderWidth: 1,
                    alignItems: 'center',
                    padding: 15,
                    borderRadius: 4
                }}
            />
        </View>
    );

    function onMultiChange() {
        return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
    }

    function onChange() {
        return (val) => setSelectedTeam(val);
    }
}

export default App;
