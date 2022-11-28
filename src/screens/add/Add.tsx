import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormState, InjectedFormProps, reduxForm } from 'redux-form';
import { MemoryHistory, Location } from 'history';
import { View } from 'react-native';
import styled from 'styled-components';

import ScreenPlacementArea from '../../components/screen/screen-placement-area/ScreenPlacementArea';
import Screen from '../../components/screen/Screen';
import { StoredSimpson, StoredSimpsons } from '../../models/store';
import { order } from '../../common/utils/commonUtil';
import Storage from '../../common/storage/storage';
import { STORAGE_KEYS } from '../../common/constants/constants';
import { RootState } from '../../store/reducers/rootReducer';
import Button from '../../components/button/Button';
import TextField from '../../components/text-field/TextField';
import paths from '../..//routes/paths';

const ButtonContainer = styled(View)`
  padding: 20px 0px;
  width: 80%;
  align-self: center;
`;

const InputContainer = styled(View)`
  padding: 10px 15px;
`;

interface AddProps {
  location: Location;
  history: MemoryHistory;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValues?: FormState;
}

type Props = InjectedFormProps<{}, AddProps> & AddProps;

const validate = (values) => {
  const errors = {
    name  : '',
    job   : '',
    about : '',
    image : ''
  };

  if (!values.name) {
    errors.name = 'Please enter name.';
  }

  if (!values.job) {
    errors.job = 'Please enter job.';
  }

  if (!values.about) {
    errors.about = 'Please enter information.';
  }

  if (!values.image) {
    errors.image = 'Please enter image url.';
  }

  return errors;
};

const Add = ({ history, formValues, handleSubmit }: Props) => {
  const [ storedSimpsons, setStoredSimpsons ] = useState<StoredSimpsons>();

  const getStored = async () => {
    const _simpsons = await Storage.getItem(STORAGE_KEYS.SIMPSONS);
    const _simpsons2: StoredSimpsons = JSON.parse(_simpsons);

    setStoredSimpsons({
      simpsons: _simpsons2?.simpsons?.sort(order)
    });
  };

  useEffect(() => {
    getStored();
  }, []);

  const handleBack = () => {
    history?.goBack();
  };

  const setStoreData = async (storeData) => {
    await Storage.setItem(STORAGE_KEYS.SIMPSONS, JSON.stringify(storeData));
  };

  const addNewCharacter = () => {
    const values = formValues?.values;
    const data: StoredSimpson[] = storedSimpsons?.simpsons || [];

    const newCharacter: StoredSimpson = {
      avatar      : 'https://cdn-icons-png.flaticon.com/512/82/82142.png',
      description : values?.about,
      job         : values?.job,
      name        : values?.name,
      order       : data.length + 1
    };

    data.push(newCharacter);
    setStoreData({ simpsons: data }).then(() => history.push(paths.HOME));
  };

  return (
    <Screen displayBackButton backButtonAction={handleBack} navbarTitle={'Add New Character'}>
      <ScreenPlacementArea isFullHeight>
        <InputContainer>
          <TextField label="Name" name="name" />
          <TextField label="Job" name="job" />
          <TextField label="About Him/Her" name="about" />
          <TextField label="Image Link" name="image" />
        </InputContainer>
        <ButtonContainer>
          <Button label="Add Character" onPress={handleSubmit(addNewCharacter)} />
        </ButtonContainer>
      </ScreenPlacementArea>
    </Screen>
  );
};

const mapStateToProps = (state: RootState) => ({
  formValues: state.form.AddForm
});

export default reduxForm<{}, AddProps>({
  form: 'AddForm',
  validate
})(connect(mapStateToProps)(Add));
