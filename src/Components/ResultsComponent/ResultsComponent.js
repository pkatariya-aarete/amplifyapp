import React from "react";
import { Storage } from "aws-amplify";
import { Button, List, Grid, Icon, Segment, Header } from "semantic-ui-react";
import Axios from 'axios';
import FileViewer from 'react-file-viewer';


const filePath = 'dev/result-excel/client-groups/cg1/';
// const filePath = 'doczy-ontario/Results/';
// const file = "https://aarete-ocr.s3.amazonaws.com/dev/result-excel/client-groups/cg1/Result%202021-03-05%2014%3A56%3A45.012.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIARMDM3537SHNQ6DEZ%2F20210318%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210318T051438Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLWVhc3QtMSJGMEQCIAth0vZtZ3uf5XKyyE1J08Rk6CayNzo8AEwtkFRc0aWNAiB%2BkjZb36u5WD%2FbHK7awGKGmUUyVmwxoE7afsjjG14NWirEBAg%2BEAEaDDA5NDcxNzYwMzU4MyIMdLH1thi8H0sVhy3AKqEE%2B7rQFwVeJqyeaMdx72YjTquTzDdgBSTqYaPuuJv5%2FdTQg2jnOx7dk4Hv3R9yWKaGT5y2ciKmjIH0QGXFD%2FuWGAsnPIa%2BgUsI2udkO74297U6YFpQb7Z3ZDdCJPEHGwGKLfrpyaWN8k%2F%2Fe%2FKLuLfVH8ZxiGjQQWRe0B5Gjix1YolT%2B8mzK1tLns1MY3y8v98XS0QiMwMay%2BISb4Ica7yz4750HUOobOKnd%2BEv8nuFHLr9lvRRW3DClFxidqPj4H6MKseEXaDI37hgIu9fq3EYYEbhdDNjZSWgWtebLSajkuV78L9GXv1s7QfxadQGvLJdUbL8%2Bu1uGu6mfEdLU6xG%2F43nAe8GzEfGFZv4MgY1dcYqdzkGqUiTjljq6XzfQdt53P1pEO1dKCOaI7Kx%2BUpDAP0O%2BVjo4afJgNNEuvGa5p86ikO5Pg%2BM2CYIkOj7OqwIfQl9xVq7ip0D2BMreZafOHjIebK%2BoLnYZ2rACJ87qAdxDVtne%2BXRSmHii5%2F3%2F037DJuxFtRf2JtpIxlA6lMq6DiGK2yDUr%2Bu35oRyaxLnUq7N5DIofXu4DM4R02Orpx%2BZl4OkN67NbYSifp0igG3Bj6yH9uSV0TwLMrY3hbtXv97qrkgta8BE6PJUkZYuNySxLgOCTENqNsuUoPEzuiBg0DwH0MBACIszo%2Flw7%2B7NggjzHhvFjVOEYMF3%2BD3q03Gt06WgT4hZnufoxxkABhXoVcwxcPLggY6hgIzc2N4aal4rCU6olxsjtAYuSnmwue5zK5Y1DVlFZfxiOQdnwTOq12Qj30QgE2vDJe0LA%2Bi09HAzIkl61x1bLhLgAWGd3SKeIBmDGY%2BVzS%2BlxaXfCsaHywc1ZZJ0zlzQ%2BWjPUIDVIHWkPuES%2F%2B24bjZFm0AxzeBXank8xxhaGfzJgJvY%2B4z%2Fl6kXkYxJlJCqVyUBxVRcSJnRKN3e4%2FdZLSt0iXF9j93sX%2BIHQ0nKmea91AFytOTqX8IujfUWCiUSAp%2FfVIQLmW6U%2FwaDTP43hzZD2dRIffup6VfNnojTb6Zi4cDwchXeoePlCzb806vWZzTSipdSbe7Sngj2UAS33wSSzbVCUe0&X-Amz-Signature=3229f6e68f44476fa667e654b9243243c20e3dd5f6f8ce7f151424f575831cd3&X-Amz-SignedHeaders=host"; 
const type = 'xlsx';


class ResultsComponent extends React.Component {
  state = {
    processedFiles: null,
    JsonFileContent: "",
    previewFile: ""
  }
  
  listResults() {
    Storage.list(filePath, { customPrefix: { public: ''} })
      .then(result => {
        this.setState({processedFiles: result})
        console.log(result);
      })
      .catch(err => console.log(err));
  }
  

  // getFileUrl(event) {
  //   Storage.get(event, { customPrefix: { public: ''} })
  //     .then(result => {
  //       Axios.get(result)
  //         .then(res => {
  //           console.log(res.url, "Hiiii");
  //           // if (typeof(res.data) === "string") {
  //             this.setState({JsonFileContent: res.data})
  //           // } else {
  //           //   this.setState({JsonFileContent: '[{"key":"Message","value":"File Too Big To Preview"}]'})
  //           // }
  //         })
  //         .catch(err => console.log(err));
  //     })
  //     .catch(err => console.log(err));
  // }

  previewFile(event, index){
    Storage.get(event, { customPrefix: { public: ''} })
    .then(res => {
      Axios.get(res)
        .then(response => {
          console.log(res,"Hiiii");
         this.setState({previewFile: res});
        })
    })
  }

  downloadFile(event) {
    Storage.get(event, { customPrefix: { public: ''} })
    .then(res => {
      Axios.get(res)
        .then(response => {
          var url = "";
          console.log(res);
          if (typeof(response.data) === "string") {
            // url = window.URL.createObjectURL(new Blob([response.data]));
            url = res;
          } else {
            // url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)]));
            url = res;
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
      
              <List divided relaxed className="docList" style={{maxHeight:"370px", minHeight:'200px',overflowY:"auto"}}>
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
                              <Icon name='download' />
                            </Button>
                            <Button icon
                              onClick = {() => this.previewFile(d.key)}
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
         <Grid style={{margin:"0",padding:"0"}}>
          <Grid.Row>
          <Grid.Column className="pageTitleResult">
            <Header as='h2' floated='left' content='Output file/s' className="uploadFiles"></Header>
              <Button 
                icon 
                color='orange'
                floated='right'
                onClick = {() => this.listResults()}
              >
              <Icon name='refresh' />
              </Button>
              
          </Grid.Column>
          <Grid.Column style={{padding:"0px"}}>
          {this.state.previewFile !== "" ?
          <Header as='h2' floated='left' content='Preview' className="uploadFiles preview"></Header>
          :""}
          </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <Divider hidden /> */}
          <Grid style={{margin:"0",padding:"0"}}>
            <Grid.Row style={{padding:"0",margin:"0 0 0 0px"}}>
              <Grid.Column width={5} >
                {this.displayResults(processedFiles)}
              </Grid.Column>
              <Grid.Column width={11}>  
              {this.state.previewFile !== "" ?
                  <FileViewer
                      fileType={type}
                      filePath={this.state.previewFile}
                  />
                  : ""}
              </Grid.Column>
              {/* <Grid.Column width={7} >
                {JsonFileContent ? ( 
                  this.displayFileContent(JsonFileContent)
                  ) : ''}
              </Grid.Column> */}
            </Grid.Row>
            
          </Grid>
      </div>
    )
  }
}

export default ResultsComponent;