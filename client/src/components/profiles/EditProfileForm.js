import React, { useState, useEffect } from 'react';
import * as axios from '../../services/axios.js';
import {
  Form,
  Grid,
  Header,
  Input,
  Button,
  Divider,
  Dropdown,
  Segment,
  Message,
  Container,
  Dimmer,
  Loader,
  Icon
} from 'semantic-ui-react';
import './signup.css';
import { useSelector, useDispatch } from 'react-redux';

const EditProfileForm = props => {
  const initialState = { fields: new Map() };
  const [state, setState] = useState(initialState);
  const [userConditions, setUserConditions] = useState([]);
  const [allConditions, setAllConditions] = useState([]);
  const auth = useSelector(state => state.auth);
  const handleAllChanges = (key, e) => {
    fields.set(key, e.target.value);
    setState({ ...state });
  };

  useEffect(() => {
    if (!auth) return;
    setState({ loading: true });
    axios.get(`${auth.role}s/${auth.accountID}`).then(response => {
      console.log(response, 'EDIT');
      setFieldAttributes(response);
    });
    if (auth.role === 'user') {
      axios.get(`users/getConditions/${auth.accountID}`).then(response => {
        console.log(response, 'CONDITIONS');
        setUserConditions(response.map(cond => cond.conditionID));
      });
      axios.get('conditions').then(response => {
        const conditionOptions = response.map(cond => ({
          value: cond.id,
          text: `${cond.name} - ${cond.abbreviation}`,
          key: cond.id
        }));
        setAllConditions(conditionOptions);
      });
    }
  }, [auth]);

  const handleChangeConditions = (e, { value }) => {
    setUserConditions(value);
  };

  const setFieldAttributes = data => {
    const dataMap = new Map();
    const {
      name,
      address,
      description,
      isComplete,
      phoneNumber,
      mobile,
      age,
      allergies,
      diabetes,
      surgicalHistory,
      weight,
      birthDate
    } = data;
    let map = null;
    let typeMap = new Map();
    if (auth.role === 'hospital')
      map = new Map([
        ['name', name],
        ['address', address],
        ['phoneNumber', phoneNumber],
        ['description', description]
      ]);
    else {
      map = new Map([
        ['name', name],
        ['mobile', mobile],
        ['birthDate', birthDate],
        ['allergies', allergies],
        ['diabetes', diabetes],
        ['surgicalHistory', surgicalHistory],
        ['weight', weight]
      ]);
      typeMap.set('birthDate', 'DATE');
      typeMap.set('diabetes', 'SELECT');
    }
    setState({
      ...state,
      fields: map,
      isComplete,
      loading: false,
      typeMap
    });
  };

  const update = () => {
    //setState({ ...state, loading: true });
    const url = `${auth.role}s/edit`;
    const reqBody = [...fields.entries()].reduce((accum, entry) => {
      console.log(entry, 'ENTRY');
      accum[entry[0]] = entry[1];
      return accum;
    }, {});

    axios.put(url, reqBody).then(() => {
      if (auth.role === 'user') {
        axios
          .put('users/addConditions', { conditions: userConditions })
          .then(() => redirect());
      } else redirect();
    });
  };

  const redirect = () => {
    props.history.push(`${auth.role}/${auth.accountID}`);
  };
  const { loading, fields, isComplete, typeMap } = state;
  if (!auth) return null;

  if (loading)
    return (
      <Dimmer active>
        <Loader></Loader>
      </Dimmer>
    );

  return (
    <Grid id="signup" columns={1} centered stackable>
      <Grid.Row columns={1} id="header-row">
        <Grid.Column textAlign="center">
          <Form inverted size="big" widths="equal" error onSubmit={update}>
            <Header inverted as="h1">
              {' '}
              Update Your Profile{' '}
            </Header>
            {[...fields.entries()].map(entry => {
              const [key, value] = entry;
              const type = typeMap.get(key);
              if (type === 'DATE') {
                return (
                  <Form.Field key={key}>
                    <label>{key}</label>
                    <input
                      type="date"
                      value={value}
                      onChange={e => handleAllChanges(key, e)}
                    />
                  </Form.Field>
                );
              }
              if (type === 'SELECT') {
                return (
                  <Form.Field>
                    <label>Diabetes</label>
                    <Dropdown
                      selection
                      options={[
                        { key: 'y', value: true, text: 'YES' },
                        { key: 'n', value: false, text: 'NO' }
                      ]}
                      value={fields.get('diabetes')}
                      onChange={(e, { value }) =>
                        handleAllChanges(key, { target: { value } })
                      }
                    ></Dropdown>
                  </Form.Field>
                );
              }

              return (
                <Form.Field key={key}>
                  <label>{key}</label>
                  <Input
                    value={value}
                    onChange={e => handleAllChanges(key, e)}
                  />
                </Form.Field>
              );
            })}
            {auth.role === 'user' && (
              <Form.Field>
                <label>Diabetes</label>
                <Dropdown
                  selection
                  options={allConditions}
                  multiple
                  search
                  value={userConditions}
                  onChange={handleChangeConditions}
                ></Dropdown>
              </Form.Field>
            )}
            <Button
              //disabled={!this.checkInput()}
              loading={loading}
              color="yellow"
              type="submit"
              fluid
            >
              {isComplete ? 'Update' : 'Update and Complete profile'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default EditProfileForm;
