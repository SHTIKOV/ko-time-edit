# ko-time-edit

Time edit is a knokout component for simple convert units of measure.

## How to install

`$ npm i ko-time-edit`

After install you need import file with component to your project.

```
reqire('ko-time-edit');
```

## How to use

```
<time-edit params="seconds: fooVar"></time-edit>
```

## Params
| Name            | Type      | Default                     | Description                                             |
|-----------------|-----------|-----------------------------|---------------------------------------------------------|
| `required`      | bool      | false                       | Make fields required for fill, show validate message.   |
| `disabled`      | bool      | false                       | Make fields disabled.                                   |
| `hasSeconds`    | bool      | true                        | Show/Hide field with second.                            |
| `hasMinutes`    | bool      | true                        | Show/Hide field with minutes.                           |
| `hasHours`      | bool      | true                        | Show/Hide field with hours.                             |
| `hasDays`       | bool      | true                        | Show/Hide field with days.                              |
| `validationMsg` | string    | 'Необходимо заполнить поле' | Validation message shown when param `required` is true. |
