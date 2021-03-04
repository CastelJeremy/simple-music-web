class Song {
    constructor(id, album, name, length) {
        this._id = id;
        this._album = album;
        this._name = name;
        this._length = length;
    }

    setId(id) { this._id = id; }
    getId() { return this._id; }

    setAlbum(album) { this._album = album; }
    getAlbum() { return this._album; }

    setName(name) { this._name = name; }
    getName() { return this._name; }

    setLength(length) { this._length = length; }
    getLength() { return this._length; }

    getLengthFormated() {
        const minutes = Math.floor(this._length / 60);
        const secondes = this._length % 60;

        if (secondes < 10) {
            return `${minutes}:0${secondes}`;
        } else {
            return `${minutes}:${secondes}`;
        }
    }

    toobject() {
        return {
            id: this._id,
            album: this._album,
            name: this._name,
            length: this._length,
        };
    }
}

export default Song;
