/* global ko */

/**
 * Time edit component
 * 
 * @param {int} seconds: 0
 * @param {bool} disabled: false
 * @param {bool} required: false
 * @param {bool} hasSeconds: true
 * @param {bool} hasMinutes: true
 * @param {bool} hasHours: true
 * @param {bool} hasDays: true
 * @param {string} validationMsg: 'Необходимо заполнить поле'
 *
 * @autor Константин Штыков (shtykov)
 */
ko.components.register('time-edit', {
    viewModel: function(params) {
        const SECONDS_TITLE = 'Секунды';
        const MINUTES_TITLE = 'Минуты';
        const HOURS_TITLE = 'Часы';
        const DAYS_TITLE = 'Дни';

        let self = this;

        self.constants = {
            CSS_WARNING: CSS_WARNING,
            EMPTY_STRING: EMPTY_STRING,
            SECONDS_TITLE: SECONDS_TITLE,
            MINUTES_TITLE: MINUTES_TITLE,
            HOURS_TITLE: HOURS_TITLE,
            DAYS_TITLE: DAYS_TITLE,
        };

        self.seconds = params.seconds;
        self.isDisabled = params.disabled ? params.disabled : ko.observable(false);
        self.hasSeconds = params.hasSeconds !== undefined ? params.hasSeconds : true;
        self.hasMinutes = params.hasMinutes !== undefined ? params.hasMinutes : true;
        self.hasHours = params.hasHours !== undefined ? params.hasHours : true;
        self.hasDays = params.hasDays !== undefined ? params.hasDays : true;
        self.validationMsg = ko.observable(params.validationMsg ? params.validationMsg : params.required ? 'Необходимо заполнить это поле' : '');

        self.isRequired = ko.pureComputed({
            read: () => params.required && !self.seconds(),
            owner: self,
        });

        self.minutes = ko.pureComputed({
            read: () => self.seconds() / 60,
            write: minutes => self.seconds(minutes * 60),
            owner: self,
        });

        self.hours = ko.pureComputed({
            read: () => self.seconds() / 60 / 60,
            write: hours => self.seconds(hours * 60 * 60),
            owner: self,
        });

        self.days = ko.pureComputed({
            read: () => self.seconds() / 60 / 60 / 24,
            write: days => self.seconds(days * 60 * 60 * 24),
            owner: self,
        });
    },
    template:
        '<div class="input-group"\
                data-bind="css: isRequired() ? constants.CSS_WARNING : constants.EMPTY_STRING,\
                            tooltip: { title: validationMsg }">\
            <!-- ko if: hasSeconds -->\
            <span class="input-group-addon">\
                <abbr data-bind="tooltip: { title: constants.SECONDS_TITLE }">С</abbr>\
            </span>\
            <input class="form-control"\
                type="number"\
                style="height: 34px;"\
                data-bind="textInput: seconds, attr: { disabled: isDisabled, placeholder: constants.SECONDS_TITLE }" />\
            <!-- /ko -->\
\
            <!-- ko if: hasMinutes -->\
            <span class="input-group-addon">\
                <abbr data-bind="tooltip: { title: constants.MINUTES_TITLE }">М</abbr>\
            </span>\
            <input class="form-control"\
                type="number"\
                style="height: 34px;"\
                data-bind="textInput: minutes, attr: { disabled: isDisabled, placeholder: constants.MINUTES_TITLE }" />\
            <!-- /ko -->\
\
            <!-- ko if: hasHours -->\
            <span class="input-group-addon">\
                <abbr data-bind="tooltip: { title: constants.HOURS_TITLE }">Ч</abbr>\
            </span>\
            <input class="form-control"\
                type="number"\
                style="height: 34px;"\
                data-bind="textInput: hours, attr: { disabled: isDisabled, placeholder: constants.HOURS_TITLE }" />\
            <!-- /ko -->\
\
            <!-- ko if: hasDays -->\
            <span class="input-group-addon">\
                <abbr data-bind="tooltip: { title: constants.DAYS_TITLE }">Д</abbr>\
            </span>\
            <input class="form-control"\
                type="number"\
                style="height: 34px;"\
                data-bind="textInput: days, attr: { disabled: isDisabled, placeholder: constants.DAYS_TITLE }" />\
            <!-- /ko -->\
        </div>\
        <!-- ko if: isRequired -->\
        <span class="help-block" data-bind="text: validationMsg"></span>\
        <!-- /ko -->',
});