import React from 'react';
import Select from 'react-select';

class SoundInfo extends React.Component {
  constructor(props)
  {
    super(props);

    this.notations = [
      {value: "а", label:"а"},
      {value: "о", label:"о"},
      {value: "у", label:"у"},
      {value: "э", label:"э"},
      {value: "и", label:"и"},
      {value: "ы", label:"ы"},
      {value: "б", label:"б"},
      {value: "б'", label:"б'"},
      {value: "в", label:"в"},
      {value: "в’", label:"в’"},
      {value: "г", label:"г"},
      {value: "г’", label:"г’"},
      {value: "д", label:"д"},
      {value: "д’", label:"д’"},
      {value: "ж", label:"ж"},
      {value: "з", label:"з"},
      {value: "з’", label:"з’"},
      {value: "й’", label:"й’"},
      {value: "к", label:"к"},
      {value: "к’", label:"к’"},
      {value: "л", label:"л"},
      {value: "л’", label:"л’"},
      {value: "м", label:"м"},
      {value: "м’", label:"м’"},
      {value: "н", label:"н"},
      {value: "н’", label:"н’"},
      {value: "п", label:"п"},
      {value: "п’", label:"п’"},
      {value: "р", label:"р"},
      {value: "р’", label:"р’"},
      {value: "с", label:"с"},
      {value: "с’", label:"с’"},
      {value: "т", label:"т"},
      {value: "т’", label:"т’"},
      {value: "ф", label:"ф"},
      {value: "ф’", label:"ф’"},
      {value: "х", label:"х"},
      {value: "х’", label:"х’"},
      {value: "ц", label:"ц"},
      {value: "ч’", label:"ч’"},
      {value: "ш", label:"ш"},
      {value: "щ’", label:"щ’"},
      {value: "?", label:"?"},
      {value: "_", label:"_"},
    ]

    this.languages = [
      {value:"русский", label:"русский"},
      {value:"английский", label:"английский"},
      {value:"французский", label:"французский"},
    ];
    this.state = {
      soundLang: '',
      soundValue: '',
      soundStress: '',
    };
  }

  renderSelect()
  {
    return (
      <Select
        autoFocus={false}
        id="language"
        name="Язык"
        options={this.languages}
        openMenuOnFocus
        closeMenuOnSelect={true}
        placeholder="Тут язык..."
        value={this.state.soundLang}
        onChange={
          (selectedOpt) => {
            this.setState({soundLang: selectedOpt});
            this.props.changeLang(selectedOpt.label);
          }
        }
      />
    );
  }

    renderStressSelect()
    {
        return (
            <Select
        autoFocus={false}
        id="stress"
        name="Ударение"
        options={[{value: 'Нет', label: 'Нет'}, {value: 'Основное', label: "Основное"}, {value: 'Вторичное', label: "Вторичное"}]}
        openMenuOnFocus
        closeMenuOnSelect={true}
        placeholder="Ударение..."
        value={this.state.soundLang}
        onChange={
        (selectedOpt) => {
        this.setState({soundStress: selectedOpt});
        this.props.changeStress(selectedOpt);
    }
    }
        />
    );
    }

  renderNotations()
  {
    return (
      <Select
        autoFocus={false}
        id="language"
        name="Значение"
        options={this.notations}
        openMenuOnFocus
        closeMenuOnSelect={true}
        placeholder="А тут фонему..."
        value={this.state.soundValue}
        onChange={
          (selectedOpt) => {
            this.setState({soundValue: selectedOpt});
            this.props.changeNotation(selectedOpt.label);
          }
        }
      />
    );
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="card bg-dark box-shadow" >
          <div style={{display: 'flex'}}>
            <div id="selectPhoneme" style={{width: '80%'}}>
              {this.renderNotations()}
            </div>
            <div id="selectPhoneme" style={{width: '20%'}}>
                {this.renderStressSelect()}
            </div>
          </div>
            <button className="btn btn-primary btn-md btn3d" name="saveSound" onClick={this.props.saveSound}><span class="glyphicon glyphicon-ok"></span>Добавить фонему</button>
            <div id="select" style={{width: '100%'}}>
              {this.renderSelect()}
            </div>
            <br/><input name="soundDialect" placeholder="Ну а тут диалект..." id="soundDialect" onChange={this.props.handleInputChange} value={this.props.state.soundDialect} type="text"/><br/>
            <p> </p>
        </div>
      </div>
    );
  }
}

export default SoundInfo;


