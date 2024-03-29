import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import axios from "axios";
import Select from 'react-select';

class WavePlayerSent extends React.Component {
  constructor(props)
  {
    super(props);
    this.createWavePlayerSent = this.createWavePlayerSent.bind(this);
    this.slide = this.slide.bind(this);
    this.btn = this.btn.bind(this);
    this.btnLoad = this.btnLoad.bind(this);
    this.options = [];
    this.state = {selectedOption: {}}

    this._CUSTOM_COLOR = 'rgba(23, 63, 95, 1)';
    this._CUSTOM_COLOR_2 = 'rgba(23, 63, 95, 1)';
  }

  init(f)
  {
    document.getElementById('waveformsent').innerHTML = '';
    this.createWavePlayerSent('http://speechdb.ru/audio/' + f.value);
    this.setState({selectedOption: f.value});
  }

  createWavePlayerSent(url)
  {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveformsent',
      waveColor: '#F4A261',
      progressColor: '#F4A261',
      backend: 'MediaElement',
      plugins: [
        RegionPlugin.create({
          dragSelection: true,
        }),
        Timeline.create({
          primaryLabelInterval: 10,
          timeInterval: 1,
          container: "#timelinesent"
        })
      ]
    });

    this.wavesurfer.on('region-update-end', (region, event) => {
      document.getElementById('waveformsent').focus();
      this.props.newTimeIntervalSent(region.start.toFixed(3), region.end.toFixed(3))
    });
    //this.wavesurfer.on('region-update-end', (region) => {this.props.newTimeInterval(region.start.toFixed(3), region.end.toFixed(3))});
    this.wavesurfer.on('region-created', (region) => {
      for (let i in this.wavesurfer.regions.list)
      {
        if (!this.wavesurfer.regions.list[i].phoneme)
        {
          this.wavesurfer.regions.list[i].remove();
        }
      }
    });
    this.wavesurfer.on('region-click', function(region, e) {
      e.stopImmediatePropagation();
      region.play();
    });
    this.wavesurfer.load(url);

  }

  btn()
  {
    let end = document.getElementById('prevEndSent');
    let start = document.getElementById('prevStartSent');
    this.props.saveSent();
    this.wavesurfer.addRegion({id: this.wavesurfer.regions.list.length, start: +start.value, end: +end.value, color: this._CUSTOM_COLOR});
    //console.log(this.wavesurfer.regions.list);
    let region = {};
    for (let i in this.wavesurfer.regions.list)
    {
      region = this.wavesurfer.regions.list[i];
    }

    region.attributes.label = 'Sent';
    region.phoneme = true;
    region.drag = false;

    let regionEl = region.element;
    let deleteButton = regionEl.appendChild(document.createElement('deleteButton'));
    deleteButton.className = 'fa fa-trash';
    deleteButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      this.props.deleteSent(region.start.toFixed(3), document.getElementById('sentValue').value);
      region.remove();
    });
    deleteButton.title = "Delete region";
    let css = {
     display: 'flex',
      "justify-content": 'center',
      zIndex: 10,
      cursor: 'pointer',
      cursor: 'hand',
      color: '#E76F51'
    };
    region.style(deleteButton, css);

    regionEl = region.element;
    let sentNotation = regionEl.appendChild(document.createElement('sentNotation'+this.wavesurfer.regions.list.length-1));
    //console.log(region.id);

    sentNotation.title = "Edit region";
    sentNotation.innerHTML = document.getElementById('sentValue').value;
    region.style(sentNotation, css);
  }

  btnLoad(a, b, c)
  {
    console.log(this)
    let end = a;
    let start = b;
    this.props.saveSent();
    this.wavesurfer.addRegion({id: this.wavesurfer.regions.list.length, start: +start, end: +end, color: this._CUSTOM_COLOR});
    //console.log(this.wavesurfer.regions.list);
    let region = {};
    for (let i in this.wavesurfer.regions.list)
      region = this.wavesurfer.regions.list[i];

    region.attributes.label = 'Sent';
    region.phoneme = true;
    region.drag = false;

    let regionEl = region.element;
    let deleteButton = regionEl.appendChild(document.createElement('deleteButton'));
    deleteButton.className = 'fa fa-trash';
    deleteButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      this.props.deleteSent(region.start.toFixed(3), c);
      region.remove();
    });
    deleteButton.title = "Delete region";
    let css = {
     display: 'flex',
      "justify-content": 'center',
      zIndex: 10,
      cursor: 'pointer',
      cursor: 'hand',
      color: '#E76F51'
    };
    region.style(deleteButton, css);

    regionEl = region.element;
    let sentNotation = regionEl.appendChild(document.createElement('sentNotation'+this.wavesurfer.regions.list.length-1));
    //console.log(region.id);

    sentNotation.title = "Edit region";
    sentNotation.innerHTML = c;
    region.style(sentNotation, css);
  }

  slide()
  {
    let slider = document.getElementById('slider');
    let zoomLevel = Number(slider.value);
    //console.log(this.wavesurfer);
    this.wavesurfer.zoom(zoomLevel);
  }

  render() {
    return (
        <div className="col-md-12 px-0">
          <div id="waveformsent"></div>
          <div id="timelinesent"></div>
          <br/><div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card bg-dark box-shadow">
                <input name="sentValue" id="sentValue" placeholder="Тут предложение..." onChange={this.props.handleInputChange} type="text"/><br/>
                <button className="btn btn-primary btn-md btn3d" name="saveSound" onClick={this.btn}>Добавить предложение</button>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div style={{display: "none"}}> <input id="prevEndSent" value={this.props.state.endTimeSent} type="text" /><input id="prevStartSent" value={this.props.state.startTimeSent} type="text" /> </div>
          <p></p>
        </div>
    );
  }
}

export default WavePlayerSent;
