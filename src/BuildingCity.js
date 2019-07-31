import React from "react";
import horizontalRoad from "./assets/img/road_horizontal.jpg";
import verticalRoad from "./assets/img/road_vertical.jpg";
import home from "./assets/img/home.jpeg";

export class BuildingCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: []
    };
  }

  componentDidMount() {
    this.createBlocks(30);
  }

  createBlocks = n => {
    let elements = [...this.state.elements];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        elements.push({
          layout: `<span class='block'></span>`,
          component: ""
        });
      }
    }
    this.setState({
      elements
    });
  };

  createMarkup = element => {
    return { __html: element };
  };

  allowDrop = ev => {
    ev.preventDefault();
  };

  drag = ev => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  drop = ev => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let node = document.getElementById(data);
    let nodeCopy = {};
    if (node !== null) {
      nodeCopy = node.cloneNode(true);
      nodeCopy.id = "newId";
      ev.target.appendChild(nodeCopy);
    }
  };

  render() {
    return (
      <>
        <div>
          {this.state.elements.map((element, index) => {
            return index % 30 !== 0 ? (
              <span
                key={index}
                dangerouslySetInnerHTML={this.createMarkup(element.layout)}
                onDrop={e => this.drop(e, index)}
                onDragOver={this.allowDrop}
              />
            ) : (
              <>
                <span
                  key={index}
                  dangerouslySetInnerHTML={this.createMarkup(element.layout)}
                  onDrop={this.drop}
                  onDragOver={this.allowDrop}
                />
                {index !== 0 && <br />}
              </>
            );
          })}
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  id="horizontalRoad"
                  src={horizontalRoad}
                  onDragStart={this.drag}
                  width="43"
                  height="43"
                />
              </td>
              <td />
              <td>
                <img
                  id="home"
                  src={home}
                  onDragStart={this.drag}
                  width="45"
                  height="43"
                />
              </td>
              <td>
                <img
                  id="verticalRoad"
                  src={verticalRoad}
                  onDragStart={this.drag}
                  width="45"
                  height="43"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
