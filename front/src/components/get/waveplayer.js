import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import axios from "axios";
import Select from 'react-select';

class WavePlayer extends React.Component {  
  constructor(props)
  {
    super(props);
    this.createWavePlayer = this.createWavePlayer.bind(this);
    this.options = [];
    this.state = {selectedOption: {}};

    document.addEventListener('DOMContentLoaded', (event) => {
      this.init();
    })
  }

  init()
  {
    document.getElementById('waveform').innerHTML = '';
    this.createWavePlayer('http://speechdb.ru/audio/' + this.props.record);
    this.setState({selectedOption: this.props.record});
    document.getElementById('waveform').focus();
  }

  createWavePlayer(url)
  {
    let wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'red',
      progressColor: 'red',
      backend: 'MediaElement',
      plugins: [
        RegionPlugin.create({
          dragSelection: true,
        }),
        Timeline.create({
          primaryLabelInterval: 10,
          timeInterval: 1,
          container: "#timeline"
        })
      ]
    });

    document.onkeydown = (e) => {
      let keyCode = e.keyCode;
      if(keyCode == 32) {
        wavesurfer.playPause();
      }

      if(keyCode == 31) {
        let end = document.getElementById('prevEnd');
        let start = document.getElementById('prevStart');
        console.log(end);
        //wavesurfer.clearRegions();

        console.log(wavesurfer.regions.list);
        if (document.getElementById('selPhoneme').innerText != '')
          wavesurfer.addRegion({id: document.getElementById('selPhoneme').innerText, start: +start.innerText, end: +end.innerText, color: 'hsla(100, 100%, 30%, 0.1)'});
        else
          wavesurfer.addRegion({id: document.getElementById('selectPhoneme').innerText, start: +start.innerText, end: +end.innerText, color: 'hsla(100, 100%, 30%, 0.1)'});

        let region = {};
        for (let i in wavesurfer.regions.list)
        {
          region = wavesurfer.regions.list[i];
        }

        region.attributes.label = 'Phoneme';
        region.phoneme = true;    


        let regionEl = region.element;
      
        let deleteButton = regionEl.appendChild(document.createElement('deleteButton'));
        deleteButton.className = 'fa fa-trash';
        deleteButton.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          this.props.deleteRegion(region.start.toFixed(3));
          region.remove();
        });
        deleteButton.title = "Delete region";
        let css = {
         display: 'block',
          float: 'center',
          position: 'relative',
          zIndex: 10,
          cursor: 'pointer',
          cursor: 'hand',
          color: '#129fdd'
        };
        region.style(deleteButton, css);


        let phonemeNotation = regionEl.appendChild(document.createElement('phonemeNotation'));
        phonemeNotation.title = "Edit region";
        phonemeNotation.innerHTML = region.id;
        phonemeNotation.addEventListener('click', (e) => {
          //e.stopImmediatePropagation();
          this.props.changeSoundInfoWave(region.start.toFixed(3));
        });
        region.style(phonemeNotation, css);
      }
      if(keyCode == 30) {
        for (let i in wavesurfer.regions.list)
        {
          if (!wavesurfer.regions.list[i].phoneme)
          {
            wavesurfer.regions.list[i].remove();
          }
        }
        let not = this.props.soundValue;
        let region = {};
        for (let i in wavesurfer.regions.list)
          if (wavesurfer.regions.list[i].id == not)
          {
            region = wavesurfer.regions.list[i];
            break;
          }
        //region.color = 'hsla(137, 60%, 80%, 0.1)';
        //console.log(region);
      }
    };

    wavesurfer.on('ready', function ()
    {
      document.getElementById('slider').oninput = function()
      {
        let slider = document.getElementById('slider');
        let zoomLevel = Number(slider.value);
        wavesurfer.zoom(zoomLevel);
      };
    });

    wavesurfer.on('region-update-end', (region, event) => {  
      this.props.newTimeInterval(region.start.toFixed(3), region.end.toFixed(3))
    });
    //wavesurfer.on('region-update-end', (region) => {this.props.newTimeInterval(region.start.toFixed(3), region.end.toFixed(3))});
    wavesurfer.on('region-created', (region) => {
      for (let i in wavesurfer.regions.list)
      {
        if (!wavesurfer.regions.list[i].phoneme)
        {
          wavesurfer.regions.list[i].remove();
        }
      }
    });
    wavesurfer.on('region-click', function(region, e) {
      e.stopImmediatePropagation();
      region.play();
    });
    wavesurfer.load(url);
    
  }

  render() {  
    return (
        <div className="col-md-12 px-0">
          <div id="waveform"></div>
          <div id="timeline"></div>
          <input id="slider" type="range" min="1" max="1000" defaultValue="1"/>
          <div style={{display: "none"}}> <input id="prevEnd" value={this.props.state.endTime} type="text" /><input id="selPhoneme" type="text" /><input id="prevStart" value={this.props.state.startTime} type="text" /> </div>
          <p></p>
        </div>
    );
  }
}

export default WavePlayer;