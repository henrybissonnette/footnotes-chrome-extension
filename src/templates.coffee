
Footnotes.template = (templateName) ->
  Footnotes.mustacheWrapper().create templateName

Footnotes.mustacheWrapper = ->
  create: (templateName) ->
    name = templateName.match(/[^\/]+$/)[0]
    @currentTemplate = Footnotes.templates[name]
    this

  render: (context) ->
    Mustache.render @currentTemplate, context

Footnotes.templates = 
    questionFormTemplate:
      """
        <form>
          <input size=28 type="text" name='title' value="{{title}}"
          class=".boxsizingBorder" placeholder="Title"/>
          <textarea rows=5 columns=40 name="content" 
          class="resize_vertical .boxsizingBorder"
          placeholder="Question">{{content}}</textarea>
          <br/>
          {{#id}}
          <input type="hidden" name="id" value="{{id}}" />
          {{/id}}
          <input type="submit" value={{^id}}"ask"{{/id}}{{#id}}"save"{{/id}} />
          <button class="close">cancel</button>
          {{#id}}
          <button class="delete">delete</button>
          {{/id}}
        </form>
      """

    questionTemplate:
      """
        <div class="title">
          <span class="minimize clickable">-</span>
          <span class="text">{{title}}</span>
        </div>

        <div class="info">
          <span class="author">
            {{#creatorID}}
              <a class="toCreatorPage" href="/users/{{creatorID}}">{{creatorName}}</a>
            {{/creatorID}} 
            {{^creatorID}}
            anonymous
            {{/creatorID}}
            at {{createdAtPretty}}
          </span>
        </div>

        <div class="content">
         <span class="type_indicator">Q</span> {{content}} <br/>
         <span class="responses">{{descendantCount}} below</span>
        </div>
        <div class="pusher"></div>
        {{#canEdit}}
        <button class="edit">edit</button>
        {{/canEdit}}
      """

    staticQuestionTemplate:
      """
        <div class="title">
          <span class="text">{{title}}</span>
        </div>

        <div class="info">
          <span class="author">
            {{#creatorID}}
              <a class="toCreatorPage" href="/users/{{creatorID}}">{{creatorName}}</a>
            {{/creatorID}} 
            {{^creatorID}}
            anonymous
            {{/creatorID}}
            at {{createdAtPretty}}
          </span>
        </div>

        <div class="content">
          <span class="type_indicator">Q</span> {{content}}
          <span class="responses">{{descendantCount}} responses</span>
          <div class="pusher"></div>
        </div>
      """

    noteFocusTemplate:
      """
        <button class="goUp">back</button>
        <div class="focus"></div>
        <hr/>
        <div class="form"></div>
        <div class="children"></div>
      """

    overlayTemplate:
      """
        <h1>
          Q &amp; A
        </h1>
        <div class="new"></div>
        <div class="notes"></div>
      """