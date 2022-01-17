module.exports = class Embed {
  constructor() {
    this.type = 'rich'
    this.title = null
    this.description = null
    this.url = null
    this.color = null
    this.timestamp = null
    this.fields = []
    this.thumbnail = null
    this.image = null
    this.video = null
    this.author = null
    this.provider = null
    this.footer = null
    this.files = []
  }
  setTitle(text) {
    this.title = text;
    return this;
  }

  setDescription(text) {
    this.description = text;
    return this;
  }
  setUrl(text) {
    this.url = text;
    return this;
  }
  setThumbnail(text) {
    this.thumbnail = text;
    return this;
  }
  setTimestamp(text) {
    this.timestamp = new Date(Date.now()).toISOString();
    return this;
  }
  setImage(text) {
    this.image = text;
    return this;
  }
  setFooter(text) {
    this.footer = text;
    return this;
  }
  addAttachment(text) {
    this.files.push(text);
    return this;
  }
  attachFiles(...file) {
    this.files = Object.prototype.toString.call(file[0]) === '[object Array]' ? file[0] : file;
    return this;
  }
  setAuthor(user, avatar, url) {
    this.author = {
      name: user,
      iconURL: avatar,
      url: url ? url : null
    }
    return this;
  }
  setVideo(text) {
    this.image = text;
    return this;
  }
  setColor(text) {
    if(text === "RANDOM") text = Math.floor(Math.random()*16777215).toString(16);
    text = text.split("#").join('');
    this.color = parseInt(text, 16);
    return this;
  }

  addField(name, value, inline) {
    this.fields.push({ name, value, inline });
    return this;
  }
}
