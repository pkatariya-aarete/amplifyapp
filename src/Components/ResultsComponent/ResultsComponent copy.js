import React from "react";
import { Storage } from "aws-amplify";
import { Button, List, Grid, Icon, Segment, Divider } from "semantic-ui-react";
import Axios from 'axios';

const filePath = 'dev/textract-output-staging/client-groups/cg1';

class ResultsComponent extends React.Component {
  state = {
    processedFiles: null,
    JsonFileContent: ""
  }

  listResults() {
    Storage.list(filePath, { customPrefix: { public: ''} })
      .then(result => {
        this.setState({processedFiles: result})
      })
      .catch(err => console.log(err));
  }

  getFileUrl(event) {
    Storage.get(event, { customPrefix: { public: ''} })
      .then(result => {
        Axios.get(result)
          .then(res => {
            if (typeof(res.data) === "string") {
              this.setState({JsonFileContent: res.data})
            } else {
              this.setState({JsonFileContent: '[{"key":"Message","value":"File Too Big To Preview"}]'})
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  downloadFile(event) {
    Storage.get(event, { customPrefix: { public: ''} })
    .then(res => {
      Axios.get(res)
        .then(response => {
          var url = ""
          if (typeof(response.data) === "string") {
            url = window.URL.createObjectURL(new Blob([response.data]));
          } else {
            url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)]));
          }
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.getFileNameFromPath(event)); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => console.log(err));
    }
    )
    .catch(err => console.log(err));
  }

  getFileNameFromPath(filePath) {
    return filePath.split("/").splice(-1)[0]
  }

  displayResults(data) {
    if (data) {
      return (
        <List divided verticalAlign='middle'>
          {
            data.map((d, index) => 
              (index !== 0) ? (
                <List.Item key={d.key}>
                  <List.Content floated='left' >
                    <h1>{this.getFileNameFromPath(d.key)}</h1>
                  </List.Content>
                  <List.Content floated='right'>
                    <Button.Group size='mini'>
                      <Button icon
                        onClick = {() => this.downloadFile(d.key)}
                        >
                        <Icon name='cloud download' />
                      </Button>
                      <Button icon
                        onClick = {() => this.getFileUrl(d.key)}
                        >
                        <Icon name='eye' />
                      </Button>
                    </Button.Group>
                  </List.Content>
                </List.Item>
              ): ''
            )
          }
        </List>
      )
    }
  }

  displayFileContent(JsonString) {
    return (
      <Segment inverted style={{ overflow: 'auto', maxHeight: 400 }}>
        <List divided celled>
          {
          JSON.parse(JsonString).map((d, i) => {
            return (
                <List.Item key={d.key} >
                  <List.Content floated='left'>{d.key}</List.Content>
                  <List.Content floated='right'>{d.value}</List.Content>  
                </List.Item>
              )
            }) 
          }
        </List>
      </Segment>
    )
  }

  render() {
    const { processedFiles, JsonFileContent } = this.state
    return (
      <div>
        <Grid>
          <Grid.Column textAlign='center'>
            <Button
              content='Refresh'
              icon='refresh'
              color='orange'
              onClick={() => this.listResults()}
            />
          </Grid.Column>
        </Grid>
        <Divider hidden />
          <Grid columns={2} stackable textAlign='center'>
            <Grid.Row stretched>
              <Grid.Column width={4}>
                {this.displayResults(processedFiles)}
              </Grid.Column>
              <Grid.Column width={4}>
                {JsonFileContent ? ( 
                  this.displayFileContent(JsonFileContent)
                  ) : ''}
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}

export default ResultsComponent;