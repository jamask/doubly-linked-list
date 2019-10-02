const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        if (this.length == 0) {
            let newNode = new Node(data);
            this._head = newNode;
            this._tail = newNode;
            this.length++;
        } else {
            let newNode = new Node(data, this._tail);
            this._tail.next = newNode;
            this._tail = newNode;
            this.length++;
        }

        return this;
    }

    head() {
        if (this._head) {
            return this._head.data;
        } else {
            return null;
        }
    }

    tail() {
        if (this._tail) {
            return this._tail.data;
        } else {
            return null;
        }
        
    }

    at(index) {
        if ((index < 0) || (index > this.length - 1)) {
            return false;
        }

        let count = 0;
        let nodeData = this._head;
        while (index > count) {
            nodeData = nodeData.next;
            count++;
        }
        return nodeData.data;
    }

    insertAt(index, data) {
        if ((index < 0) || (index > this.length - 1)) {
            return false;
        }

        if (index == 0) {
            let newNode = new Node(data, null, this._head);
            this.head.prev = newNode;
            this._head = newNode;
        } else if (index == this.length) {
            let newNode = new Node(data);
            this._tail.next = newNode;
            newNode.prev = this._tail;
            this._tail = newNode;
        } else {
            let count = 0;
            let nodeData = this._head;
            let prev = null;
            while (index > count) {
                prev = nodeData;
                nodeData = nodeData.next;
                count++;
            }
            let newNode = new Node(data);
            prev.next = newNode;
            newNode.prev = prev;

            newNode.next = nodeData;
            nodeData.prev = newNode;
        }
        this.length++;

        return this;
    }

    isEmpty() {
        if (this.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        if ((index < 0) || (index > this.length - 1)) {
            return false;
        }

        if (index == 0) {
            this._head = this._head.next;
            if (this._head) {       //если удаляем единст. элемент
                this._head.prev = null;
            }
        } else if (index == this.length-1) {
            this._tail = this._tail.prev;
            this._tail.next = null;
        } else {
            let count = 0;
            let nodeData = this._head;
            let prev = null;
            while (index > count) {
                prev = nodeData;
                nodeData = nodeData.next;
                count++;
            }

            prev.next = nodeData.next;
            nodeData.next.prev = prev;
        }
        this.length--;
        return this;
    }

    reverse() {
        if (this.length <= 1) {
            return this;
        }

        let nodeData = this._head;
        let swap = null;
        while(nodeData != null) { 
            swap = nodeData.next; 
            nodeData.next = nodeData.prev; 
            nodeData.prev = swap; 
            nodeData = swap;
            
        }
        [this._head, this._tail] = [this._tail, this._head];

        return this;
    }

    indexOf(data) {
        let count = 0;
        let nodeData = this._head;
        while (count < this.length) {
            if (nodeData.data == data) {
                return count;
            }
            nodeData = nodeData.next;
            count++;
        }
        return -1;
    }
}

module.exports = LinkedList;
