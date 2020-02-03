import React, {useState, useMemo} from 'react';
import {DatePickerIOS, Picker} from 'react-native';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, DateButton, DateText, Picker} from './styles';

export default function DateInput({props, onChange}) {
  const [opened, setOpened] = useState(false);
  const dateFormatted = useMemo(() => {
    format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt});
  }, [date]);

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20}></Icon>
        <DateText>{dateFormatted}</DateText>

        {opened && (
          <Picker>
            <DatePickerIOS
              date={date}
              onDateChange={onChange}
              minimumDate={new Date()}
              minuteInterval={60}
              locale={pt}
              mode="date"
            />
          </Picker>
        )}
      </DateButton>
    </Container>
  );
}
