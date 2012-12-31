Footnotes.Views.NewQuestionFormView = Backbone.View.extend

  events:
    'submit form': 'submit'
    'click .open': 'openForm'
    'click .close': 'onClose'

  initialize: (options) ->
    @questions = options.questions

  render: ->
    @closeForm()
    return this
      
  onClose: (event) ->
    event.preventDefault()
    @closeForm()

  closeForm: ->
    contents = Footnotes.template('newQuestion').render()
    @$el.html contents
  
  openForm: ->
    content = Footnotes.template('forms/questionFormTemplate').render()
    @$el.html content      

  submit: (event) ->
    event.preventDefault()
    data = Footnotes.formToObj @$('form')
    data['external_url'] = Footnotes.Overlay.getExternalURL()
    data['createdAt'] = (new Date).toISOString()
    @questions.create data
    @closeForm() 
