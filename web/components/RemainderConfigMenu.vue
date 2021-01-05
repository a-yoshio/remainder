 <template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-show="loginStatus" v-on="on" v-bind="attrs">
       <v-icon white>
          mdi-wrench
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" to="/tag" nuxt>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { authModule } from '@/store'
export default {
    data() {
        return {
            items: [
                {
                    title: 'edit tag',
                },
            ]
        }
    },
    computed: {
        loginStatus() {
            console.log('get', authModule.login_state)
            return authModule.login_state
        }
    }
    
}
</script>