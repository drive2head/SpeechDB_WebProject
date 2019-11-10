import React from 'react';
import Header from '../header.js';

class MainInterface extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="container">
				<Header/>
				<div class="jumbotron" style={{borderRadius: "25px"}}>
		    		<p class="text-justify">Разработанное программное обеспечение представляет собой веб-приложение, которое позволяет пользователю взаимодействовать с речевой базой данных, размещенной на удаленном сервере, с помощью браузера. Для загрузки данных был разработан специальный интерфейс, позволяющий загружать аудиозапись в формате .wav и делать разметку фонем. Этот интерфейс представляет собой виджет, который создает визуализацию загруженной аудиозаписи, и набор форм для описания фонем и диктора. Визуализация аудиозаписи представляет собой осциллограмму, которую пользователь может масштабировать и перемещать с помощью полосы прокрутки. Также пользователь может выделять на осциллограмме необходимые участки, соотвествующие определенным фонемам. После выделения некоторой фонемы, в специальную форму заносится информация о ее времени начала и завершения. Далее в данной форме пользователю необходимо указать язык, диалект и транскрипцию для данной фонемы. Однако, чтобы загрузить размеченные фонемы в базу данных, пользователю также необходимо заполнить форму и информацией о дикторе.</p>
					<p class="text-justify">Для хранения фонем используется графовая база данных, то есть вся хранимая информация о фонемах и дикторах представляет собой один большой граф. Представление информации в виде графа открывает широкие возможности для описания связей между хранимыми данными, что очень актуально в данной ситуации. Еще одним преимуществом является то, что графовая база данных является достаточно гибким решением. Она позволяет расширять существующую структуру добавлением новых узлов или новых связей поверх существующих узлов.
В данный момент основными сущностями, или узлами, в используемой базе данных являются 'фонема', 'диктор' и 'нарушение речи'. Второстепенными сущностями являются 'запись', 'страна' и 'город'. Каждая из сущностей хранит определенную информацию, касающуюся фонем и диктора. 'Фонема' содержит информацию о языке и диалекте, а также транскрипцию данной фонемы. 'Диктор' содержит полное имя и информацию о поле, возрасте и родном языке. 'Нарушение речи' описывает наличие акцента или дефектов речи, если таковые имеются. Подобное разбиение позволяет получать информацию о произношениях фонем по различным заданным параметрам. Например, можно сделать выборку фонем английского языка, произнесенных людьми, которые имеют мужской пол, живут в Нью-Йорке, имеют акцент и чей родной язык является русским.</p>
		    	</div>
	    	</div>

		);
	}
}

export default MainInterface;
