# ProPresenter API Endpoints

Total: 231 endpoint-method combinations

## Group 1: `/v1/announcement`

### 1.1 `GET` `/v1/announcement/active`
_Requests the currently active announcement presentation._

### 1.2 `GET` `/v1/announcement/active/focus`
_Focuses the currently active announcement presentation._

### 1.3 `GET` `/v1/announcement/active/next/trigger`
_Triggers the next cue in the active announcement presentation (if there is one)._

### 1.4 `GET` `/v1/announcement/active/previous/trigger`
_Triggers the previous cue in the currently active announcement presentation (if there is one)._

### 1.5 `GET` `/v1/announcement/active/timeline`
_Requests the current state of the active announcement timeline._

### 1.6 `GET` `/v1/announcement/active/timeline/{operation}`
_Performs the requested timeline operation for the active announcment presentation._

### 1.7 `GET` `/v1/announcement/active/trigger`
_Retriggers the currently active announcement presentation (starts from the beginning)._

### 1.8 `GET` `/v1/announcement/active/{index}/trigger`
_Triggers the specified cue in the currently active announcement presentation._

### 1.9 `GET` `/v1/announcement/slide_index`
_Requests the index of the current slide/cue within the currently active announcement._

## Group 2: `/v1/audio`

### 2.1 `GET` `/v1/audio/playlist/active`
_Requests the currently active audio playlist_

### 2.2 `GET` `/v1/audio/playlist/active/focus`
_Focuses the active audio playlist._

### 2.3 `GET` `/v1/audio/playlist/active/next/trigger`
_Triggers the next item in the active audio playlist._

### 2.4 `GET` `/v1/audio/playlist/active/previous/trigger`
_Triggers the previous item in the active audio playlist._

### 2.5 `GET` `/v1/audio/playlist/active/trigger`
_Triggers the active audio playlist (restarts from the beginning)._

### 2.6 `GET` `/v1/audio/playlist/active/{id}/trigger`
_Triggers the specified item in the active audio playlist._

### 2.7 `GET` `/v1/audio/playlist/focused`
_Requests the currently focused audio playlist_

### 2.8 `GET` `/v1/audio/playlist/focused/next/trigger`
_Triggers the next item in the focused audio playlist._

### 2.9 `GET` `/v1/audio/playlist/focused/previous/trigger`
_Triggers the previous item in the focused audio playlist._

### 2.10 `GET` `/v1/audio/playlist/focused/trigger`
_Triggers the focused audio playlist._

### 2.11 `GET` `/v1/audio/playlist/focused/{id}/trigger`
_Triggers the specified item in the focused audio playlist._

### 2.12 `GET` `/v1/audio/playlist/next/focus`
_Focuses the next audio playlist._

### 2.13 `GET` `/v1/audio/playlist/previous/focus`
_Focuses the previous audio playlist._

### 2.14 `GET` `/v1/audio/playlist/{playlist_id}`
_Requests a list of all the audio items in the specified audio playlist._

### 2.15 `GET` `/v1/audio/playlist/{playlist_id}/focus`
_Focuses the specified audio playlist._

### 2.16 `GET` `/v1/audio/playlist/{playlist_id}/next/trigger`
_Triggers the next item in the specified audio playlist._

### 2.17 `GET` `/v1/audio/playlist/{playlist_id}/previous/trigger`
_Triggers the previous item in the specified audio playlist._

### 2.18 `GET` `/v1/audio/playlist/{playlist_id}/trigger`
_Triggers the specified audio playlist._

### 2.19 `GET` `/v1/audio/playlist/{playlist_id}/updates`
_Requests a chunked data update every time the specified audio playlist changes._

### 2.20 `GET` `/v1/audio/playlist/{playlist_id}/{id}/trigger`
_Triggers the specified item in the specified audio playlist._

### 2.21 `GET` `/v1/audio/playlists`
_Requests a list with all the configured audio playlists._

## Group 3: `/v1/capture`

### 3.1 `GET` `/v1/capture/encodings/{type}`
_Requests a list of all available capture modes for the capture type (disk, rtmp, resi)._

### 3.2 `GET` `/v1/capture/settings`
_Requests the current capture settings._

### 3.3 `GET` `/v1/capture/status`
_Requests the current capture status and capture time._

### 3.4 `GET` `/v1/capture/{operation}`
_Performs the requested capture operation (start, stop)._

## Group 4: `/v1/clear`

### 4.1 `DELETE` `/v1/clear/group/{id}`
_Deletes the specified clear group._

### 4.2 `GET` `/v1/clear/group/{id}`
_Requests the details of the specified clear group._

### 4.3 `PUT` `/v1/clear/group/{id}`
_Sets the details of the specified clear group._

### 4.4 `GET` `/v1/clear/group/{id}/icon`
_Requests the image data for the icon of the specified clear group._

### 4.5 `PUT` `/v1/clear/group/{id}/icon`
_Sets the custom icon of the specified clear group._

### 4.6 `GET` `/v1/clear/group/{id}/trigger`
_Triggers the specified clear group._

### 4.7 `GET` `/v1/clear/groups`
_Requests a list of all the configured clear groups._

### 4.8 `POST` `/v1/clear/groups`
_Create a clear group with the details specified._

### 4.9 `GET` `/v1/clear/layer/{layer}`
_Clears the specified layer (audio, props, messages, announcements, slide, media, video_input)._

## Group 5: `/v1/find_my_mouse`

### 5.1 `GET` `/v1/find_my_mouse`
_Executes the "Find My Mouse" operation._

## Group 6: `/v1/group`

### 6.1 `GET` `/v1/groups`
_Requests a list of all the configured global groups._

## Group 7: `/v1/library`

### 7.1 `GET` `/v1/libraries`
_Requests a list of all the configured libraries._

### 7.2 `GET` `/v1/library/{library_id}`
_Requests an array of all items in the specified library._

### 7.3 `GET` `/v1/library/{library_id}/{presentation_id}/trigger`
_Triggers the first cue of the specified presentation in the specified library._

### 7.4 `GET` `/v1/library/{library_id}/{presentation_id}/{index}/trigger`
_Triggers the specified cue of the specified presentation in the specified library._

## Group 8: `/v1/look`

### 8.1 `GET` `/v1/look/current`
_Requests the details of the currently live audience look._

### 8.2 `PUT` `/v1/look/current`
_Sets the details of the currently live audience look._

### 8.3 `DELETE` `/v1/look/{id}`
_Deletes the specified audience look from the saved looks._

### 8.4 `GET` `/v1/look/{id}`
_Requests the details of the specified audience look._

### 8.5 `PUT` `/v1/look/{id}`
_Sets the details of the specified audience look._

### 8.6 `GET` `/v1/look/{id}/trigger`
_Triggers the specified audience look to make it the live/current look._

### 8.7 `GET` `/v1/looks`
_Requests a list of all configured audience looks, except the live look._

### 8.8 `POST` `/v1/looks`
_Creates a new audience look with the specified details._

## Group 9: `/v1/macro`

### 9.1 `DELETE` `/v1/macro/{id}`
_Deletes the specified macro._

### 9.2 `GET` `/v1/macro/{id}`
_Requests the details of the specified macro._

### 9.3 `PUT` `/v1/macro/{id}`
_Sets the details of the specified macro._

### 9.4 `GET` `/v1/macro/{id}/icon`
_Requests the image data for the icon of the specified macro._

### 9.5 `PUT` `/v1/macro/{id}/icon`
_Sets the custom icon of the specified macro._

### 9.6 `GET` `/v1/macro/{id}/trigger`
_Triggers the specified macro._

## Group 10: `/v1/macro_collection`

### 10.1 `DELETE` `/v1/macro_collection/{id}`
_Deletes the specified macro collection and any macros contained within it._

### 10.2 `GET` `/v1/macro_collection/{id}`
_Requests a specific collection of macros_

### 10.3 `PUT` `/v1/macro_collection/{id}`
_Sets the details of the specified macro collection._

### 10.4 `GET` `/v1/macro_collections`
_Requests a list of all collections and their contents_

### 10.5 `POST` `/v1/macro_collections`
_Creates a new macro collection with the specified name_

## Group 11: `/v1/macro`

### 11.1 `GET` `/v1/macros`
_Requests a list of all the configured macros._

## Group 12: `/v1/mask`

### 12.1 `GET` `/v1/mask/{id}`
_Requests the details of the specified mask._

### 12.2 `GET` `/v1/mask/{id}/thumbnail`
_Requests a thumbnail image of the specified mask at the given quality value._

### 12.3 `GET` `/v1/masks`
_Requests a list of all configured masks._

## Group 13: `/v1/media`

### 13.1 `GET` `/v1/media/playlist/active`
_Returns the identifier of the currently active media playlist._

### 13.2 `GET` `/v1/media/playlist/active/focus`
_Sets the focus to the active media playlist._

### 13.3 `GET` `/v1/media/playlist/active/next/trigger`
_Triggers the next item in the active media playlist._

### 13.4 `GET` `/v1/media/playlist/active/previous/trigger`
_Triggers the previous item in the active media playlist._

### 13.5 `GET` `/v1/media/playlist/active/trigger`
_Triggers the first item in the active media playlist._

### 13.6 `GET` `/v1/media/playlist/active/{media_id}/trigger`
_Triggers the specified item in the active media playlist._

### 13.7 `GET` `/v1/media/playlist/focused`
_Returns the identifier of the currently focused media playlist_

### 13.8 `GET` `/v1/media/playlist/focused/next/trigger`
_Triggers the next item in the focused media playlist._

### 13.9 `GET` `/v1/media/playlist/focused/previous/trigger`
_Triggers the previous item in the focused media playlist._

### 13.10 `GET` `/v1/media/playlist/focused/trigger`
_Triggers the first item in the focused media playlist._

### 13.11 `GET` `/v1/media/playlist/focused/{media_id}/trigger`
_Triggers the specified item in the focused media playlist._

### 13.12 `GET` `/v1/media/playlist/next/focus`
_Sets the focus to the next media playlist._

### 13.13 `GET` `/v1/media/playlist/previous/focus`
_Sets the focus to the previous media playlist._

### 13.14 `GET` `/v1/media/playlist/{playlist_id}`
_Requests a list of all the media items in the specified media playlist._

### 13.15 `GET` `/v1/media/playlist/{playlist_id}/focus`
_Sets the focus to the specified media playlist._

### 13.16 `GET` `/v1/media/playlist/{playlist_id}/next/trigger`
_Triggers the next item in the specified media playlist._

### 13.17 `GET` `/v1/media/playlist/{playlist_id}/previous/trigger`
_Triggers the previous item in the specified media playlist._

### 13.18 `GET` `/v1/media/playlist/{playlist_id}/trigger`
_Triggers the first item in the specified media playlist._

### 13.19 `GET` `/v1/media/playlist/{playlist_id}/updates`
_Requests a chunked data update every time the specified media playlist changes._

### 13.20 `GET` `/v1/media/playlist/{playlist_id}/{media_id}/trigger`
_Triggers the specified item in the specified media playlist._

### 13.21 `GET` `/v1/media/playlists`
_Requests a list of all the configured media playlists._

### 13.22 `GET` `/v1/media/{uuid}/thumbnail`
_Requests a thumbnail image of the specified media item at the given quality value._

## Group 14: `/v1/message`

### 14.1 `DELETE` `/v1/message/{id}`
_Deletes the specified message._

### 14.2 `GET` `/v1/message/{id}`
_Requests the details of the specified message._

### 14.3 `PUT` `/v1/message/{id}`
_Sets the details of the specified message._

### 14.4 `GET` `/v1/message/{id}/clear`
_Clears / Hides the specified message._

### 14.5 `POST` `/v1/message/{id}/trigger`
_Triggers / Shows the specified message._

### 14.6 `GET` `/v1/messages`
_Requests a list of all configured messages._

### 14.7 `POST` `/v1/messages`
_Creates a new message with specified details._

## Group 15: `/v1/playlist`

### 15.1 `GET` `/v1/playlist/active`
_Requests the details of the active playlist._

### 15.2 `GET` `/v1/playlist/active/announcement/focus`
_Moves the focus to the currently active playlist for the announcement destination._

### 15.3 `GET` `/v1/playlist/active/announcement/trigger`
_Triggers the first item in the currently active playlist for the announcement destination._

### 15.4 `GET` `/v1/playlist/active/announcement/{index}/thumbnail/{cue_index}`
_Requests a thumbnail image for the specified item in the currently active playlist for the announcement destination_

### 15.5 `GET` `/v1/playlist/active/announcement/{index}/trigger`
_Triggers the specified item in the currently active playlist for the announcement destination._

### 15.6 `GET` `/v1/playlist/active/presentation/focus`
_Moves the focus to the currently active playlist for the presentation destination._

### 15.7 `GET` `/v1/playlist/active/presentation/trigger`
_Triggers the first item in the currently active playlist for the presentation destination._

### 15.8 `GET` `/v1/playlist/active/presentation/{index}/thumbnail/{cue_index}`
_Requests a thumbnail image for the specified item in the currently active playlist for the presentation destination_

### 15.9 `GET` `/v1/playlist/active/presentation/{index}/trigger`
_Triggers the specified item in the currently active playlist for the presentation destination._

### 15.10 `GET` `/v1/playlist/focused`
_Requests the details of the currently focused playlist._

### 15.11 `GET` `/v1/playlist/focused/next`
_Returns the playlist item that will be triggered by /v1/playlist/focused/next/trigger._

### 15.12 `GET` `/v1/playlist/focused/next/trigger`
_Triggers the next item in the currently focused playlist._

### 15.13 `GET` `/v1/playlist/focused/previous`
_Returns the playlist item that will be triggered by /v1/playlist/focused/previous/trigger._

### 15.14 `GET` `/v1/playlist/focused/previous/trigger`
_Triggers the previous item in the currently focused playlist._

### 15.15 `GET` `/v1/playlist/focused/trigger`
_Triggers the first item in the currently focused playlist._

### 15.16 `GET` `/v1/playlist/focused/{index}/trigger`
_Triggers the specified item in the focused playlist._

### 15.17 `GET` `/v1/playlist/next/focus`
_Moves the focus to the next playlist._

### 15.18 `GET` `/v1/playlist/previous/focus`
_Moves the focus to the previous playlist._

### 15.19 `GET` `/v1/playlist/{playlist_id}`
_Requests a list of the items in the specified playlist._

### 15.20 `POST` `/v1/playlist/{playlist_id}`
_Creates a playlist with the specified details underneath the specified playlist or playlist folder._

### 15.21 `PUT` `/v1/playlist/{playlist_id}`
_Sets the contents of the specified playlist._

### 15.22 `GET` `/v1/playlist/{playlist_id}/focus`
_Moves the focus to the specified playlist._

### 15.23 `GET` `/v1/playlist/{playlist_id}/next/trigger`
_Triggers the next item in the specified playlist._

### 15.24 `GET` `/v1/playlist/{playlist_id}/previous/trigger`
_Triggers the previous item in the specified playlist._

### 15.25 `GET` `/v1/playlist/{playlist_id}/trigger`
_Triggers the first item in the specified playlist._

### 15.26 `GET` `/v1/playlist/{playlist_id}/updates`
_Requests a chunked data update every time the specified playlist changes._

### 15.27 `GET` `/v1/playlist/{playlist_id}/{index}/thumbnail/{cue_index}`
_Requests a thumbnail image for the specified item in the specified playlist_

### 15.28 `GET` `/v1/playlist/{playlist_id}/{index}/trigger`
_Triggers the specified item in the specified playlist._

### 15.29 `GET` `/v1/playlists`
_Requests a list of all configured playlists._

### 15.30 `POST` `/v1/playlists`
_Creates a playlist with the specified details._

## Group 16: `/v1/presentation`

### 16.1 `GET` `/v1/presentation/active`
_Requests the details of the currently active presentation._

### 16.2 `GET` `/v1/presentation/active/focus`
_Sets the focus to the active presentation._

### 16.3 `GET` `/v1/presentation/active/group/{group_id}/trigger`
_Triggers the specified group of the active presentation._

### 16.4 `GET` `/v1/presentation/active/next/trigger`
_Triggers the next cue of the active presentation._

### 16.5 `GET` `/v1/presentation/active/previous/trigger`
_Triggers the previous cue of the active presentation._

### 16.6 `GET` `/v1/presentation/active/timeline`
_Requests the current state of the timeline for the currently active presentation._

### 16.7 `GET` `/v1/presentation/active/timeline/{operation}`
_Performs the requested timeline operation (play, pause, rewind) for the currently active presentation._

### 16.8 `GET` `/v1/presentation/active/trigger`
_Retriggers the active presentation from the start._

### 16.9 `GET` `/v1/presentation/active/{index}/trigger`
_Triggers the specified cue of the active presentation._

### 16.10 `GET` `/v1/presentation/chord_chart`
_Requests the current chord chart image (if available) at the given quality value._

### 16.11 `GET` `/v1/presentation/chord_chart/updates`
_Requests a chunked data update every time the chord chart changes._

### 16.12 `GET` `/v1/presentation/focused`
_Gets the currently focused presentation in the main UI._

### 16.13 `GET` `/v1/presentation/focused/group/{group_id}/trigger`
_Triggers the specified group of the currently focused presentation in the main UI._

### 16.14 `GET` `/v1/presentation/focused/next/trigger`
_Triggers the next cue of the currently focused presentation in the main UI._

### 16.15 `GET` `/v1/presentation/focused/previous/trigger`
_Triggers the previous cue of the currently focused presentation in the main UI._

### 16.16 `GET` `/v1/presentation/focused/timeline`
_Requests the current state of the timeline for the currently focused presentation in the main UI._

### 16.17 `GET` `/v1/presentation/focused/timeline/{operation}`
_Performs the requested timeline operation (play, pause, rewind) for the currently focused presentation in the main UI._

### 16.18 `GET` `/v1/presentation/focused/trigger`
_Triggers the currently focused presentation in the main UI._

### 16.19 `GET` `/v1/presentation/focused/{index}/trigger`
_Triggers the specified cue of the currently focused presentation in the main UI._

### 16.20 `GET` `/v1/presentation/next/focus`
_Sets the focus to the next presentation._

### 16.21 `GET` `/v1/presentation/previous/focus`
_Sets the focus to the previous presentation._

### 16.22 `GET` `/v1/presentation/slide_index`
_Requests the index of the current slide/cue within the currently active presentation._

### 16.23 `GET` `/v1/presentation/{uuid}`
_Requests the details of the specified presentation._

### 16.24 `GET` `/v1/presentation/{uuid}/focus`
_Sets the focus to the specified presentation._

### 16.25 `GET` `/v1/presentation/{uuid}/group/{group_id}/trigger`
_Triggers the specified group of the specified presentation._

### 16.26 `GET` `/v1/presentation/{uuid}/next/trigger`
_Triggers the next cue of the specified presentation._

### 16.27 `GET` `/v1/presentation/{uuid}/previous/trigger`
_Triggers the previous cue of the specified presentation._

### 16.28 `GET` `/v1/presentation/{uuid}/thumbnail/{index}`
_Requests a thumbnail image of the specified cue inside the specified presentation at the given quality value._

### 16.29 `GET` `/v1/presentation/{uuid}/timeline/{operation}`
_Performs the requested timeline operation (play, pause, rewind) for the specified presentation._

### 16.30 `GET` `/v1/presentation/{uuid}/trigger`
_Triggers the specified presentation._

### 16.31 `GET` `/v1/presentation/{uuid}/{index}/trigger`
_Triggers the specified cue of the specified presentation._

## Group 17: `/v1/prop`

### 17.1 `DELETE` `/v1/prop/{id}`
_Deletes the specified prop._

### 17.2 `GET` `/v1/prop/{id}`
_Requests the details of the specified prop._

### 17.3 `PUT` `/v1/prop/{id}`
_Sets the details of the specified prop._

### 17.4 `GET` `/v1/prop/{id}/auto_clear/pause`
_Pauses auto-clear timer for the specified prop._

### 17.5 `GET` `/v1/prop/{id}/auto_clear/resume`
_Resumes auto-clear timer for the specified prop._

### 17.6 `GET` `/v1/prop/{id}/clear`
_Clears the specified prop._

### 17.7 `GET` `/v1/prop/{id}/thumbnail`
_Requests a thumbnail image of the specified prop at the given quality value._

### 17.8 `GET` `/v1/prop/{id}/trigger`
_Triggers the specified prop._

## Group 18: `/v1/prop_collection`

### 18.1 `DELETE` `/v1/prop_collection/{id}`
_Deletes the specified prop collection and any props contained within it._

### 18.2 `GET` `/v1/prop_collection/{id}`
_Requests a specific collection of props_

### 18.3 `PUT` `/v1/prop_collection/{id}`
_Sets the details of the specified prop collection._

### 18.4 `GET` `/v1/prop_collections`
_Requests a list of all collections and their contents_

### 18.5 `POST` `/v1/prop_collections`
_Creates a new prop collection with the specified name_

## Group 19: `/v1/prop`

### 19.1 `GET` `/v1/props`
_Gets a list of all the props._

## Group 20: `/v1/stage`

### 20.1 `DELETE` `/v1/stage/layout/{id}`
_Deletes the specified stage layout._

### 20.2 `GET` `/v1/stage/layout/{id}/thumbnail`
_Requests a thumbnail image of the specified stage layout at the given quality value._

### 20.3 `GET` `/v1/stage/layout_map`
_Requests the currently selected stage layout for each configured stage screen._

### 20.4 `PUT` `/v1/stage/layout_map`
_Sets the specified stage message to the corresponding stage screens._

### 20.5 `GET` `/v1/stage/layouts`
_Requests a list of the configured stage layouts._

### 20.6 `DELETE` `/v1/stage/message`
_Hides the currently displayed stage message from the configured stage screen._

### 20.7 `GET` `/v1/stage/message`
_Requests the currently active stage message._

### 20.8 `PUT` `/v1/stage/message`
_Shows the specified stage message on the configured stage screen._

### 20.9 `GET` `/v1/stage/screen/{id}/layout`
_Requests the current stage layout for the specified stage screen._

### 20.10 `GET` `/v1/stage/screen/{id}/layout/{layout_id}`
_Sets the specified stage layout for the specified stage screen._

### 20.11 `GET` `/v1/stage/screens`
_Requests a list of the configured stage screens._

## Group 21: `/v1/statu`

### 21.1 `GET` `/v1/status/audience_screens`
_Requests the status of the audience screens._

### 21.2 `PUT` `/v1/status/audience_screens`
_Sets the status of the audience screens._

### 21.3 `GET` `/v1/status/layers`
_Requests the status of all available layers._

### 21.4 `GET` `/v1/status/screens`
_Requests the details of all configured screens._

### 21.5 `GET` `/v1/status/slide`
_Requests the current/next slide text and image UUIDs._

### 21.6 `GET` `/v1/status/stage_screens`
_Requests the status of the stage screens._

### 21.7 `PUT` `/v1/status/stage_screens`
_Sets the status of the stage screens._

### 21.8 `POST` `/v1/status/updates`
_Aggregates the data from one or more streaming endpoints into a single streaming endpoint._

## Group 22: `/v1/theme`

### 22.1 `GET` `/v1/theme/{id}`
_Requests the details of the theme and theme slides._

### 22.2 `GET` `/v1/theme/{id}/slides/{theme_slide}`
_Requests the details of the specified theme slide within the specified theme._

### 22.3 `PUT` `/v1/theme/{id}/slides/{theme_slide}`
_Sets the details of the specified theme slide within the specified theme._

### 22.4 `GET` `/v1/theme/{id}/slides/{theme_slide}/thumbnail`
_Requests a thumbnail image of the specified theme slide at the given quality value._

### 22.5 `GET` `/v1/themes`
_Requests a list of all configured themes and theme slides._

## Group 23: `/v1/timer`

### 23.1 `GET` `/v1/timer/system_time`
_Requests the current system time._

### 23.2 `GET` `/v1/timer/video_countdown`
_Requests the current value of the video countdown timer._

### 23.3 `DELETE` `/v1/timer/{id}`
_Deletes the specified timer._

### 23.4 `GET` `/v1/timer/{id}`
_Requests the details of the specified timer._

### 23.5 `PUT` `/v1/timer/{id}`
_Sets the details of the specified timer._

### 23.6 `GET` `/v1/timer/{id}/increment/{time}`
_Modifies the time on the specified running timer._

### 23.7 `GET` `/v1/timer/{id}/{operation}`
_Performs the requested operation on the specified timer (start, stop, reset)._

### 23.8 `PUT` `/v1/timer/{id}/{operation}`
_Sets the details of the specified timer and performs the requested operation (start, stop, reset)._

### 23.9 `GET` `/v1/timers`
_Requests the details for all configured timers._

### 23.10 `POST` `/v1/timers`
_Creates a new timer with the specified details._

### 23.11 `GET` `/v1/timers/current`
_Requests the current time for all configured timers._

### 23.12 `GET` `/v1/timers/{operation}`
_Performs the requested operation for all configured timers (start, stop, reset)._

## Group 24: `/v1/transport`

### 24.1 `DELETE` `/v1/transport/{layer}/auto_advance`
_Cancels the auto-advance for the specified layer (presentation, announcement)._

### 24.2 `GET` `/v1/transport/{layer}/auto_advance`
_Requests the auto-advance status for the specified layer (presentation, announcement)._

### 24.3 `GET` `/v1/transport/{layer}/current`
_Requests the details of the currently playing content for the specified layer (presentation, announcement, audio)._

### 24.4 `GET` `/v1/transport/{layer}/go_to_end`
_Moves to the end on a certain layer_

### 24.5 `GET` `/v1/transport/{layer}/pause`
_Pauses the content on the specified layer (presentation, announcement, audio)._

### 24.6 `GET` `/v1/transport/{layer}/play`
_Plays the content on the specified layer (presentation, announcement, audio)._

### 24.7 `GET` `/v1/transport/{layer}/skip_backward/{time}`
_Moves backward in the content on the specified layer by the specified number of seconds (presentation, announcement, audio)._

### 24.8 `GET` `/v1/transport/{layer}/skip_forward/{time}`
_Moves forward in the content on the specified layer by the specified number of seconds (presentation, announcement, audio)._

### 24.9 `GET` `/v1/transport/{layer}/time`
_Requests the current transport time for the specified layer (presentation, announcement, audio)._

### 24.10 `PUT` `/v1/transport/{layer}/time`
_Moves to the specified time for the specified layer (presentation, announcement, audio)._

## Group 25: `/v1/trigger`

### 25.1 `GET` `/v1/trigger/audio/next`
_Triggers the next item in the currently active audio playlist._

### 25.2 `GET` `/v1/trigger/audio/previous`
_Triggers the previous item in the currently active audio playlist._

### 25.3 `GET` `/v1/trigger/media/next`
_Triggers the next item in the currently active media playlist._

### 25.4 `GET` `/v1/trigger/media/previous`
_Triggers the previous item in the currently active media playlist._

### 25.5 `GET` `/v1/trigger/next`
_Triggers the next cue or item in the currently active playlist or library._

### 25.6 `GET` `/v1/trigger/previous`
_Triggers the previous cue or item in the currently active playlist or library._

## Group 26: `/v1/video_input`

### 26.1 `GET` `/v1/video_inputs`
_Requests the contents of the video inputs playlist._

### 26.2 `GET` `/v1/video_inputs/{id}/trigger`
_Triggers a video input from the video inputs playlist._

## Group 27: `/version`

### 27.1 `GET` `/version`
_Requests the general information about the currently active ProPresenter instance._

