<template>
    <section style="background-color: #eee;">
        <div class="container py-5">

            <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-4">
                    <form @submit.prevent="sendMessage">
                        <div class="card" id="chat1" style="border-radius: 15px;">
                            <div
                                class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                                style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
                                <i class="fas fa-angle-left"></i>
                                <p class="mb-0 fw-bold">Live chat</p>
                                <i class="fas fa-times"></i>
                            </div>
                            <div class="card-body">
                                <div v-for="(inputMessage, index) in messages" :key="index">
                                    <div class="d-flex flex-row justify-content-start mb-4">
                                        <template v-if="index % 2 === 0">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                 alt="avatar 1" style="width: 45px; height: 100%;">
                                        </template>

                                        <template v-else>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                                 alt="avatar 1" style="width: 45px; height: 100%;">
                                        </template>

                                        <div class="p-3 ms-3"
                                             style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                                            <p class="small mb-0">{{ inputMessage }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-outline">
                                    <textarea v-model='message' @keydown.enter="sendMessage" class="form-control" id="textAreaExample" rows="4"></textarea>
                                    <label class="form-label" for="textAreaExample">Type your message</label>
                                </div>

                                <button class="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import {io} from "socket.io-client";
import {ref} from "vue";

const message = ref(null)
const messages = ref([])
const sendMessage = () => {
    if (!message.value) {
        alert('Please input the message')
        return
    }

    socket.emit('newMessage', message.value)
    message.value = null
}

const socket = io("ws://localhost:3000", {
    reconnectionDelayMax: 10000,
    auth: {
        token: "123"
    },
    query: {
        "my-key": "my-value"
    }
});

socket.on("connect", () => {
    console.log('connection')
});

socket.on('newMessage', (payload) => {
    messages.value.push(payload)
})

</script>

<style scoped>
#chat1 .form-outline .form-control ~ .form-notch div {
    pointer-events: none;
    border: 1px solid;
    border-color: #eee;
    box-sizing: border-box;
    background: transparent;
}

#chat1 .form-outline .form-control ~ .form-notch .form-notch-leading {
    left: 0;
    top: 0;
    height: 100%;
    border-right: none;
    border-radius: .65rem 0 0 .65rem;
}

#chat1 .form-outline .form-control ~ .form-notch .form-notch-middle {
    flex: 0 0 auto;
    max-width: calc(100% - 1rem);
    height: 100%;
    border-right: none;
    border-left: none;
}

#chat1 .form-outline .form-control ~ .form-notch .form-notch-trailing {
    flex-grow: 1;
    height: 100%;
    border-left: none;
    border-radius: 0 .65rem .65rem 0;
}

#chat1 .form-outline .form-control:focus ~ .form-notch .form-notch-leading {
    border-top: 0.125rem solid #39c0ed;
    border-bottom: 0.125rem solid #39c0ed;
    border-left: 0.125rem solid #39c0ed;
}

#chat1 .form-outline .form-control:focus ~ .form-notch .form-notch-leading,
#chat1 .form-outline .form-control.active ~ .form-notch .form-notch-leading {
    border-right: none;
    transition: all 0.2s linear;
}

#chat1 .form-outline .form-control:focus ~ .form-notch .form-notch-middle {
    border-bottom: 0.125rem solid;
    border-color: #39c0ed;
}

#chat1 .form-outline .form-control:focus ~ .form-notch .form-notch-middle,
#chat1 .form-outline .form-control.active ~ .form-notch .form-notch-middle {
    border-top: none;
    border-right: none;
    border-left: none;
    transition: all 0.2s linear;
}

#chat1 .form-outline .form-control:focus ~ .form-notch .form-notch-trailing {
    border-top: 0.125rem solid #39c0ed;
    border-bottom: 0.125rem solid #39c0ed;
    border-right: 0.125rem solid #39c0ed;
}

#chat1 .form-outline .form-control:focus ~ .form-notch .form-notch-trailing,
#chat1 .form-outline .form-control.active ~ .form-notch .form-notch-trailing {
    border-left: none;
    transition: all 0.2s linear;
}

#chat1 .form-outline .form-control:focus ~ .form-label {
    color: #39c0ed;
}

#chat1 .form-outline .form-control ~ .form-label {
    color: #bfbfbf;
}
</style>
