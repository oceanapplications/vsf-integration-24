
<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-5 w-96">
      <p class="typography-text-xs md:typography-text-sm font-bold tracking-widest text-neutral-500 uppercase">
        Let's go
      </p>
      <h1 class="typography-headline-2 md:typography-headline-1 md:leading-[67.5px] font-bold mt-2 mb-4">
        Build something amazing
      </h1>
      <p>
       addToCart()
      </p>
      <div class="box">
        <!-- <JsonViewer :value="jsonData" copyable boxed sort theme="light"  @onKeyClick="keyClick"/> -->
        <h4>Response</h4>
        <JsonViewer class="min-h-[800px] min-w-[500px]" :value="res" expandDepth="5" expanded copyable boxed sort
          theme="dark" />
      </div>
      <div class="flex flex-col md:flex-row gap-4 mt-6">
        <SfButton @click="callEndpoint" size="lg"> call </SfButton>
        <SfButton @click="reset" size="lg" variant="secondary" class="bg-white"> reset </SfButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';
import { sdk } from '~/sdk.config';
import { JsonViewer } from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";

const res = useState('waiting to call addToCart() ...');

async function callEndpoint() {
  let product = {"id":'1',"sku":"MW-MiracleWatt","name":"MiracleWatt","slug":"miraclewatt-1","description":null,"price":{"isDiscounted":false,"regularPrice":{"currency":"USD","amount":59,"precisionAmount":"2"},"value":{"currency":"USD","amount":59,"precisionAmount":"2"}},"primaryImage":{"url":"http://crm.test/storage/5X4LSFmCIP75FFtjiIGimAaYEuag7LNHqSsfUX6L.png","alt":null},"gallery":[{"url":"http://crm.test/storage/5X4LSFmCIP75FFtjiIGimAaYEuag7LNHqSsfUX6L.png","alt":null}],"rating":{"average":5,"count":99},"variants":[],"attributes":[],"quantityLimit":null}
  let product2 = {"id":'2',"sku":"MW-MiracleWatt","name":"MiracleWatt","slug":"miraclewatt-2","description":null,"price":{"isDiscounted":false,"regularPrice":{"currency":"USD","amount":49,"precisionAmount":"2"},"value":{"currency":"USD","amount":49,"precisionAmount":"2"}},"primaryImage":{"url":"http://crm.test/storage/5X4LSFmCIP75FFtjiIGimAaYEuag7LNHqSsfUX6L.png","alt":null},"gallery":[{"url":"http://crm.test/storage/5X4LSFmCIP75FFtjiIGimAaYEuag7LNHqSsfUX6L.png","alt":null}],"rating":{"average":5,"count":99},"variants":[],"attributes":[],"quantityLimit":null}
  await sdk.boilerplate.addToCart(product2, 3);
  const data = await sdk.boilerplate.addToCart(product, 4);
  res.value = data
}

function reset() {
  res.value = 'waiting to call addToCart() ...'
}
</script>
